//Copyright © 2020 Scott Orlyck.

import styles from './styles.css'
import { csvParse } from 'd3-dsv'
import { feature } from 'topojson-client'
import { select , selectAll } from 'd3-selection'
import { timeParse } from 'd3-time-format'
import { scaleSequentialLog } from 'd3-scale'
import 'd3-transition'
import { group, sum } from 'd3-array'
import { interpolateReds } from 'd3-scale-chromatic'
import Legend from '../legend'
import textTween from '../tween'
import { StatePath, FeaturePath } from '../paths'

const width = 975
const height = 610
const domain = [1, 10000]
const parseDate = timeParse("%m/%d/%y")

const svg = select(<svg viewBox={[0, 0, width, height]} width={width} height={height}/>)

const svgNode = svg.node()
const pt = svgNode.createSVGPoint()

const cursorPoint = (evt) => {
    pt.x = evt.clientX
    pt.y = event.clientY
    return pt.matrixTransform(svgNode.getScreenCTM().inverse())
}

const deaths = async () => {
    const counties = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json')
    const covid = await fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv')
    
    const covidCsv = await covid.text()
    const us = await counties.json()

    const pop = await fetch(`https://api.census.gov/data/2018/pep/population?get=POP&for=county`)
    const population = await pop.json()

    const rows = population.slice(1)
        .map(([population, state, county]) => [`${state}${county}`, +population])
    const popByCounty = new Map(rows)

    const data = csvParse(covidCsv).filter(d => d.UID.slice(3).length > 0)
    const features = feature(us, us.objects.counties).features
    const states = feature(us, us.objects.states).features
    const featuresById = group(features, feature => feature.id)

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
    const nameLabel = svg.append(() => <g/>).append(() => <text y={20}/>)
    
    svg.append(() => <g />)
        .selectAll('path')
        .data(states)
        .join(
            enter => enter.append(d => <StatePath d={d} />)
        )

    const update = (data, t) => {
        deathGroup
        .selectAll('path')
        .data(data, d => d.id)
        .join(
            enter => enter.append(d => (
                <FeaturePath 
                    d={d} 
                    nameLabel={nameLabel} 
                    fill={color(d.deaths)} 
                    cursorPoint={cursorPoint} 
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
}

const Deaths = () => (
    <>
        <h1>US COVID-19 Deaths</h1>
        <h1 className={styles.dateLabel}>1/22/2020</h1>
        <h1 className={styles.totalLabel}>0</h1>
        { svgNode }
        <Legend domain={domain} width={320} color={interpolateReds} label='COVID-19 deaths per 100k' />
    </>)

export { Deaths as default, deaths }