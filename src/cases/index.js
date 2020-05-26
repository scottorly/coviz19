//Copyright © 2020 Scott Orlyck.

import styles from './styles.css'
import Legend from '../legend'
import textTween from '../tween'
import { csvParse } from 'd3-dsv'
import { select , selectAll, event } from 'd3-selection'
import { timeParse } from 'd3-time-format'
import { scaleSequentialLog } from 'd3-scale'
import 'd3-transition'
import { group, sum } from 'd3-array'
import { interpolateBlues } from 'd3-scale-chromatic'
import { StatePath, FeaturePath } from '../paths'
import { zoom } from 'd3-zoom'

const width = 975
const height = 610
const domain = [1, 100000]
const parseDate = timeParse("%m/%d/%y")

const svg = select(<svg viewBox={[0, 0, width, height]} width={width} height={height}/>)

const cases = async (states, counties, population) => {

    const cases = await fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv')
    const covidCases = await cases.text()

    const rows = population.slice(1) 
        .map(([population, state, county]) => [`${state}${county}`, +population])

    const popByCounty = new Map(rows)

    const casesData = csvParse(covidCases).filter(d => d.UID.slice(3).length > 0)
    const featuresById = group(counties, feature=> feature.id)

    const sample = casesData[0]
    const dates = Object.keys(sample).filter(parseDate)

    const casesMapped = dates.map(key => {
        return [key, casesData.map(d => {
            const id = d.UID.slice(3)
            const total = +d[key] || 0
            const pop = +popByCounty.get(id) || 1
            const feature = (featuresById.get(id) || [])[0] || { properties: {}}
            const county = feature.properties.name
            const cases = (total/ pop) * 1e5
            const state = d.Province_State
            const label = `${county} County, ${state}`
            return {
                id,
                cases,
                feature,
                label,
                state,
                pop,
                total
            }
        })]
    })
    const color = scaleSequentialLog(interpolateBlues).domain(domain)

    const casesGroup = svg.append(() => <g />)

    var updated = false
    const updateCases = (data, t) => {
        updated = true
        casesGroup
        .selectAll('path')
        .data(data, d => d.id)
        .join(
            enter => enter.append(d => (
                <FeaturePath 
                    d={d}
                    fill={color(d.cases)} 
                />)
            )
                .call(enter => enter.style('opacity', 0).transition(t).style('opacity', 1)),
            update => update.call(update => update.transition(t).style('fill', d => color(d.cases))),
            exit => exit.call(exit => exit.transition(t).style('opacity', 0).remove())
        )
    }

    const totals = casesMapped.map(d => sum(d[1], d => d.total))

    svg.append(() => <g />)
        .selectAll('path')
        .data(states)
        .join(
            enter => enter.append(d => <StatePath d={d} />)
        )

    const getCasesDay = (counter, t) => {
        const pair = casesMapped[counter]
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
        if (counter >= casesMapped.length) {
            return
        }
        const t = e.detail.t
        const casesDay = getCasesDay(counter, t)
        updateCases(casesDay, t)
    })

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

const ConfirmedCases = () => (
    <>
        <h1>US Confirmed COVID-19 Cases</h1>
        <h1 className={styles.dateLabel}>1/22/2020</h1>
        <h1 className={styles.totalLabel}>0</h1>
        { svg.node() }
        <Legend domain={domain} width={320} color={interpolateBlues} label='COVID-19 cases per 100k' />
    </>
)

export { ConfirmedCases as default, cases }