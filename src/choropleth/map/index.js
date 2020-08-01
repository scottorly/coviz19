//Copyright © 2020 Scott Orlyck.

import styles from '../styles.css'

import textTween from './tween'
import { csvParse } from 'd3-dsv'
import { select, selectAll, event } from 'd3-selection'
import { feature } from 'topojson-client'
import { timeParse } from 'd3-time-format'
import { scaleSequentialLog } from 'd3-scale'
import { group, sum, zip, max } from 'd3-array'
import { interpolateBuPu, interpolatePuRd } from 'd3-scale-chromatic'
import { StatePath, FeaturePath } from './paths'
import { zoom } from 'd3-zoom'
import { transition } from 'd3-transition'
import { easeLinear } from 'd3-ease'
import PopUp from './popup'
import Calendar from '../calendar'

const width = 975
const height = 610
const domain = [1, 10000]
const parseDate = timeParse("%m/%d/%y")

const popup = <PopUp />
document.body.appendChild(popup)

const pathListeners = { eventListeners : [
    ['mouseleave', e => select(popup).transition().style('opacity', 0)],
    ['mouseover', function(e) {
        const [county] = select(this).data()
        select(popup)
            .transition().duration(0)
            .style('opacity', 0.75)
            .style('top', `${e.clientY - 100}px`)
            .style('left', `${e.clientX + 24 }px`)
            .select('p')
            .text(county.label)
    }]
]}

const props = {
    viewBox: [0, 0, width, height], 
    id: styles.mapSvg
}

const svg = select(<svg {...props} />);

(async () => {
    const { default: population } = await import(/* webpackChunkName: "population" */ './json/population.json')
    const { default: features } = await import(/* webpackChunkName: "features" */ './json/counties-albers-10m.json')
    let state = 'cases'
    let updated = false
    let lastCounter = 0
    
    const color = scaleSequentialLog(interpolateBuPu).domain(domain)
    const deathsColor = scaleSequentialLog(interpolatePuRd).domain([1,1000])
    
    const casesGroup = svg.append('g')
    
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
                    {...pathListeners}
                />)
            ),
            update => update.call(update => 
                update.transition(t)
                .style('fill', d => state == 'cases' ? d.fill : d.deathFill)
                .style('stroke', d => state == 'cases' ? d.fill : d.deathFill)
            ),
            exit => exit.call(exit => exit.transition(t).style('opacity', 0).remove())
        )
    }
  
    const t = transition().ease(easeLinear)
    updateCases([], t)
    
    const states = feature(features, features.objects.states).features
    
    svg.append('g')
        .selectAll('path')
        .data(states, d => d.properties.name)
        .join(enter => enter.append(d => (<StatePath d={d} eventListeners={[
            ['mouseover', function(e) {
                const data = select(this).data()
                const state = data[0].properties.name
            }], 
            ['mouseleave', function() {
                const data = select(this).data()
                const state = data[0].properties.name
            }]
        ]} />)))

    const counties = feature(features, features.objects.counties).features
        
    const cases = await fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv')
    const covidCases = await cases.text()

    const deaths = await fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv')
    const deathsCsv = await deaths.text()
    
    const rows = population.slice(1) 
        .map(([population, state, county]) => [`${state}${county}`, +population])
    const popByCounty = new Map(rows)

    const casesData = csvParse(covidCases)
    const deathsData = csvParse(deathsCsv)

    const featuresById = group(counties, feature => feature.id)

    const sample = casesData[0]
    const dates = Object.keys(sample).filter(parseDate)

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
            const totalDeaths = +deathsGroup.get(id)[0][key] || 0
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

    const totals = casesMapped.map(d => sum(d[1], d => d.total))
    const deathTotals =  casesMapped.map(d => sum(d[1], d => d.totalDeaths))
    
    const newCases = totals.map((d,i) => { 
        const yesterday = totals[i - 1] || 0
        const newToday = d - yesterday
        return newToday || 0
    })

    const newDeaths = deathTotals.map((d,i) => {
        const yesterday = deathTotals[i - 1] || 0
        const newToday = d - yesterday
        return newToday || 0
    })

    const getCasesDay = (counter, t) => {
        const pair = casesMapped[counter]
        const date = parseDate(pair[0]).toLocaleDateString()
        const dateLabel = selectAll(`#${styles.dateLabel}`).text()

        const casesYesterday = totals[counter-1] || 0
        const casesToday = totals[counter] || 0
        const newCase = newCases[counter] || 0

        const newCasesYesterday = newCases[counter - 1] || 0

        const deathsYesterday = deathTotals[counter-1] || 0
        const deathsToday = deathTotals[counter] || 0
        const newDeath = newDeaths[counter] || 0
        const newDeathsYesterday = newDeaths[counter - 1] || 0

        if (date != dateLabel) {
            selectAll(`#${styles.dateLabel}`)
                .text(date)

            selectAll(`#${styles.totalLabel}`)
                .transition(t)
                .tween('text', () => textTween(casesYesterday, casesToday))

            selectAll(`#${styles.deathLabel}`)
                .transition(t)
                .tween('text', () => textTween(deathsYesterday, deathsToday))
                
            selectAll(`#${styles.newDeaths}`)
                .transition(t)
                .tween('text', () => textTween(newDeathsYesterday, newDeath))
            
            selectAll(`#${styles.newCases}`)
                .transition(t)
                .tween('text', () => textTween(newCasesYesterday, newCase))
        }
        return pair[1]
    }
    
    updateCases(getCasesDay(0, t), t)

    window.addEventListener('tick', e => {
        const counter = e.detail.counter
        if (counter >= casesMapped.length) {
            return
        }
        lastCounter = counter
        const t = e.detail.t
        const casesDay = getCasesDay(counter, t)
        updateCases(casesDay, t)
    })

    window.addEventListener('toggle', (e) => {
        state = e.detail.state
        const t = transition().ease(easeLinear)
        const detail = { detail: { counter: lastCounter, t }}
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

    const parsedDates = dates.map(parseDate)
    const newNew = zip(parsedDates, newCases)
    const newNewNew = zip(parsedDates, newDeaths)
    const newCasesColor = scaleSequentialLog(interpolateBuPu).domain([1, max(newCases)])
    const newDeathsColor = scaleSequentialLog(interpolatePuRd).domain([1, max(newDeaths)])
    const zeroDates = parsedDates.map(date => [date, 0])

     const Calendars = () => (
         <>
            <div>
                <Calendar dates={zeroDates} d={newNew} color={newCasesColor} title='new cases' />
            </div>
            <div>   
                <Calendar dates={zeroDates} d={newNewNew} color={newDeathsColor} title='new deaths' />
            </div>
        </>)
    select(`#${styles.calendarContainer}`).append(() => <Calendars />)
})()

export default 
    <> 
        { svg.node() } 
    </>