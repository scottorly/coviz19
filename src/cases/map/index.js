//Copyright © 2020 Scott Orlyck.

import styles from '../styles.css'
import textTween from './tween'
import { csvParse } from 'd3-dsv'
import { select, selectAll, event } from 'd3-selection'
import { feature } from 'topojson-client'
import { timeParse } from 'd3-time-format'
import { scaleSequentialLog } from 'd3-scale'
import { group, sum } from 'd3-array'
import { interpolateBuPu, interpolatePuRd } from 'd3-scale-chromatic'
import { StatePath, FeaturePath } from './paths'
import { zoom } from 'd3-zoom'
import { transition } from 'd3-transition'
import { easeLinear } from 'd3-ease'

const countiesUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json'

const width = 975
const height = 610
const domain = [1, 10000]
const parseDate = timeParse("%m/%d/%y")

const props = {
    viewBox: [0, 0, width, height], width, height
}

let state = 'cases'
let updated = false
let lastCounter = 0

const svg = select(<svg {...props} />)

fetch(countiesUrl).then(async (featuresRequest) => {

    const features = await featuresRequest.json()
   
    const states = feature(features, features.objects.states).features
    const counties = feature(features, features.objects.counties).features
    
    svg.append(() => <g />)
        .selectAll('path')
        .data(states)
        .join(enter => enter.append(d => <StatePath d={d} />))
        
    const cases = await fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv')
    const covidCases = await cases.text()

    const deaths = await fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv')
    const deathsCsv = await deaths.text()
    
    const censusRequest = await fetch(`https://api.census.gov/data/2018/pep/population?get=POP&for=county`)
    const population = await censusRequest.json()
    const rows = population.slice(1) 
        .map(([population, state, county]) => [`${state}${county}`, +population])
    const popByCounty = new Map(rows)

    const casesData = csvParse(covidCases).filter(d => d.UID.slice(3).length > 0)
    const deathsData = csvParse(deathsCsv).filter(d => d.UID.slice(3).length > 0)

    const featuresById = group(counties, feature => feature.id)

    const sample = casesData[0]
    const dates = Object.keys(sample).filter(parseDate)
    const color = scaleSequentialLog(interpolateBuPu).domain(domain)
    const deathsColor = scaleSequentialLog(interpolatePuRd).domain([1,1000])

    const deathsGroup = group(deathsData, d => d.UID.slice(3))

    const casesMapped = dates.map(key => {
        return [key, casesData.map(d => {
            const id = d.UID.slice(3)
            const total = +d[key] || 0
            const pop = +popByCounty.get(id) || 0
            const feature = (featuresById.get(id) || [])[0] || { properties: {}}
            const county = feature.properties.name
            const cases = (total/ pop) * 1e5
            const state = d.Province_State
            const label = `${county} County, ${state}`
            const fill = color(cases)
            const totalDeaths = deathsGroup.get(id)[0][key] || 0
            const deathsPerCap = (totalDeaths / pop) * 1e5
            const deathFill = deathsColor(deathsPerCap)
            return {
                id,
                cases,
                feature,
                label,
                state,
                pop,
                total,
                fill,
                totalDeaths,
                deathsPerCap,
                deathFill
            }
        })
    ]})

    const casesGroup = svg.append(() => <g />)

    const updateCases = (data, t) => {
        updated = true
        casesGroup
        .selectAll('path')
        .data(data, d => d.id)
        .join(
            enter => enter.append(d => (
                <FeaturePath 
                    d={d}
                    fill={state == 'cases' ? d.fill : d.deathFill} 
                />)
            ),
            update => update.call(update => update.transition(t).style('fill', d => state == 'cases' ? d.fill : d.deathFill)),
            exit => exit.call(exit => exit.transition(t).style('opacity', 0).remove())
        )
    }

    const totals = casesMapped.map(d => sum(d[1], d => d.total))
    const deathTotals =  casesMapped.map(d => sum(d[1], d => d.totalDeaths))

    const getCasesDay = (counter, t) => {
        const pair = casesMapped[counter]
        const date = parseDate(pair[0]).toLocaleDateString()
        const dateLabel = selectAll(`#${styles.dateLabel}`).text()

        if (date != dateLabel) {
            selectAll(`#${styles.totalLabel}`)
            .transition(t)
            .tween('text', () => textTween(totals[counter-1] || 0, totals[counter]))
            
            selectAll(`#${styles.deathLabel}`)
                .transition(t)
                .tween('text', () => textTween(deathTotals[counter-1] || 0, deathTotals[counter]))
                
            selectAll(`#${styles.dateLabel}`)
                .text(date)
        }
        return pair[1]
    }
    
    window.addEventListener('tick', e => {
        const counter = e.detail.counter
        lastCounter = counter
        if (counter >= casesMapped.length) {
            return
        }
        const t = e.detail.t
        const casesDay = getCasesDay(counter, t)
        updateCases(casesDay, t)
    })

    window.addEventListener('toggle', e => {
        state = state == 'cases' ? 'deaths' : 'cases'
        const t = transition().ease(easeLinear)
        const detail = { detail: { counter: lastCounter }}
        window.dispatchEvent(new CustomEvent('tick', detail))
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
})

export default svg