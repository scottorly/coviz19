//Copyright © 2020 Scott Orlyck.

import styles from './styles.css'
import { csvParse } from 'd3-dsv'
import { select , selectAll, event } from 'd3-selection'
import { timeParse } from 'd3-time-format'
import { scaleSequentialLog } from 'd3-scale'
import 'd3-transition'
import { group, sum } from 'd3-array'
import { interpolateReds } from 'd3-scale-chromatic'
import Legend from '../legend'
import textTween from '../tween'
import { StatePath, FeaturePath } from '../paths'
import { zoom } from 'd3-zoom'

const width = 975
const height = 610
const domain = [1, 10000]
const parseDate = timeParse("%m/%d/%y")

const svg = select(<svg viewBox={[0, 0, width, height]} width={width} height={height}/>)

const deaths = async (states, counties, population) => {
    const covid = await fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv')
    const covidCsv = await covid.text()

    const rows = population.slice(1)
        .map(([population, state, county]) => [`${state}${county}`, +population])
    const popByCounty = new Map(rows)

    const data = csvParse(covidCsv).filter(d => d.UID.slice(3).length > 0)
    const featuresById = group(counties, feature => feature.id)

    const sample = data[0]
    const dates = Object.keys(sample).filter(parseDate).sort((a, b) => parseDate(a) > parseDate(b))

    const mapped = dates.map(key => {
        return [key, data.map(d => {
            const id = d.UID.slice(3)
            const feature = (featuresById.get(id) || [])[0] || { properties: {}}
            const county = feature.properties.name || ''
            const total = d[key]
            const pop = popByCounty.get(id)
            const deaths = (d[key] / pop) * 1e5
            const state = d.Province_State
            const label = `${county} County, ${state}`
            return {
                id,
                deaths,
                feature,
                label,
                state,
                pop,
                total
            }
        })]
    })

    const color = scaleSequentialLog(interpolateReds).domain(domain)

    const deathGroup = svg.append(() => <g />)
    
    svg.append(() => <g />)
        .selectAll('path')
        .data(states)
        .join(
            enter => enter.append(d => <StatePath d={d} />)
        )

    let updated = false
    const update = (data, t) => {
        updated = true
        deathGroup
        .selectAll('path')
        .data(data, d => d.id)
        .join(
            enter => enter.append(d => (
                <FeaturePath 
                    d={d}
                    fill={color(d.deaths)} 
                    />
                ))
                .call(enter => enter.style('opacity', 0).transition(t).style('opacity', 1)),
            update => update.call(update => update.transition(t).style('fill', d => color(d.deaths))),
            exit => exit.call(exit => exit.transition(t).style('opacity', 0).remove())
        )
    }

    const totals = mapped.map(d => sum(d[1], d => d.total))
    
    const getDay = (counter, t) => {
        const pair = mapped[counter]
        const date = parseDate(pair[0]).toLocaleDateString()

        selectAll(`.${styles.totalLabel}`)
            .transition(t)
            .tween('text', () => textTween(totals[counter-1] || 0, totals[counter]))

        selectAll(`.${styles.dateLabel}`)
            .text(date)
        return pair[1]
    }

    window.addEventListener('tick', e => {
        const counter = e.detail.counter
        if (counter >= mapped.length) {
            return
        }
        const t = e.detail.t
        const day = getDay(counter, t)
        update(day, t)
    }, 250)

    const zooms = () => {
        if (updated == true) {
            svg.selectAll('path').attr('transform', event.transform)
        }
    }

    svg.call(zoom()
        .scaleExtent([1, 4])
        .on('zoom', zooms)
    )
}

const Deaths = () => (
    <>
        <h1>US COVID-19 Deaths</h1>
        <h1 className={styles.dateLabel}>1/22/2020</h1>
        <h1 className={styles.totalLabel}>0</h1>
        { svg.node() }
        <Legend domain={domain} width={320} color={interpolateReds} label='COVID-19 deaths per 100k' />
    </>)

export { Deaths as default, deaths }