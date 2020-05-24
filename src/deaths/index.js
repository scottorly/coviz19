import styles from './styles.css'
import { csvParse } from 'd3-dsv'
import { geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import { select , selectAll } from 'd3-selection'
import { timeParse } from 'd3-time-format'
import { scaleSequential } from 'd3-scale'
import 'd3-transition'
import { group, sum } from 'd3-array'
import { interpolateReds } from 'd3-scale-chromatic'
import Legend from '../legend'
import textTween from '../tween'

const width = 975
const height = 610
const parseDate = timeParse("%m/%d/%y")

const svg = select(<svg viewBox={[0, 0, width, height]} width={width} height={height}/>)

const deaths = async () => {
    const counties = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json')
    const covid = await fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv')
    
    const covidCsv = await covid.text()
    const us = await counties.json()

    const data = csvParse(covidCsv).filter(d => d.UID.slice(3).length > 0)
    const features = feature(us, us.objects.counties).features
    const states = feature(us, us.objects.states).features
    const featuresById = group(features, feature => feature.id)

    const sample = data[0]
    const dates = Object.keys(sample).filter(parseDate).sort((a, b) => parseDate(a) > parseDate(b))

    const mapped = dates.map(key => {
        return [key, data.map(d => ({
            id: d.UID.slice(3),
            deaths: d[key],
            feature: (featuresById.get(d.UID.slice(3)) || [])[0]
        }))]
    })

    const totals = mapped.map(d => sum(d[1], d => d.deaths))
    
    const getDay = counter => {
        const pair = mapped[counter]
        const date = parseDate(pair[0]).toLocaleDateString()

        select(`.${styles.totalLabel}`)
            .transition('text.tween')
            .tween('text', () => textTween(totals[counter-1] || 0, totals[counter]))

        selectAll(`.${styles.dateLabel}`)
            .text(date)
        return pair[1].filter(d => d.deaths > 0)
    }

    const color = scaleSequential([0, 1000], interpolateReds)
    const path = geoPath()

    const deathGroup = svg.append(() => <g />)

    svg.append(() => <g />)
        .selectAll('path')
        .data(states)
        .join(
            enter => enter.append(d => <path stroke='#ccc' stroke-linejoin='round' fill='none' d={path(d)}/>)
        )

    const update = (data) => {
        deathGroup
        .selectAll('path')
        .data(data, d => d.id)
        .join(
            enter => enter.append(d => <path stroke='#ccc' stroke-linejoin='round' fill={color(d.deaths)} d={path(d.feature)}/>)
                .call(enter => enter.style('opacity', 0).transition(250).style('opacity', 1)),
            update => update.call(update => update.transition(250).style('fill', d => color(d.deaths))),
            exit => exit.call(exit => exit.transition(250).style('opacity', 0).remove())
        )
    }

    var counter = 0 
    let interval
    interval = setInterval(() => {
        if (counter >= mapped.length) {
            clearInterval(interval)
            return
        }
        const day = getDay(counter)
        update(day)
        counter++
    }, 250)
}

deaths()

const Deaths = () => (
    <>
        <h1>US COVID-19 Deaths</h1>
        <h1 className={styles.dateLabel}/>
        <h1 className={styles.totalLabel}/>
        { svg.node() }
        <Legend domain={[0, 1000]} width={320} color={interpolateReds} scale={scaleSequential} />
        <a href="https://github.com/ScottORLY/coviz19/blob/master/src/deaths/index.js">source code</a>
    </>)

export default Deaths