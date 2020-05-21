import styles from './styles.css'
import { csvParse } from 'd3-dsv'
import { geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import { select , selectAll } from 'd3-selection'
import { timeParse } from 'd3-time-format'
import { scaleSqrt, scaleSequential  } from 'd3-scale'
import { max, extent, sum, group } from 'd3-array'
import { interpolateReds, interpolateBlues } from 'd3-scale-chromatic'

const counties = fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json')
const covid = fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv')
const cases = fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv')

const width = 975
const height = 610
const parseDate = timeParse("%m/%d/%y")

Promise.all([counties, covid, cases]).then(async ([countiesResponse, covidResponse, casesResponse]) => {
    const covidCsv = await covidResponse.text()
    const us = await countiesResponse.json()

    const covidCases = await casesResponse.text()
    const casesData = csvParse(covidCases).filter(d => d.UID.slice(3).length > 0)

    const data = csvParse(covidCsv).filter(d => d.UID.slice(3).length > 0)
    const features = feature(us, us.objects.counties).features
    const states = feature(us, us.objects.states).features
    const featuresById = group(features, feature => feature.id)

    const sample = data[0]
    const dates = Object.keys(sample).filter(parseDate).sort((a, b) => parseDate(a) > parseDate(b))

    const mapped = [...dates.map(key => {
        return [key, data.map(d => ({
            id: d.UID.slice(3),
            deaths: d[key],
            feature: (featuresById.get(d.UID.slice(3)) || [])[0]
        }))]
    })]
    
    const casesMapped = [...dates.map(key => {
        return [key, casesData.map(d => ({
            id: d.UID.slice(3),
            cases: d[key],
            feature: (featuresById.get(d.UID.slice(3)) || [])[0]
        }))]
    })]

    const getDay = counter => {
        const pair = [...mapped][counter]
        const date = parseDate(pair[0])
        return pair[1].filter(d => d.deaths > 0)
    }

    const getCasesDay = counter => {
        const pair = [...casesMapped][counter]
        const date = parseDate(pair[0])
        selectAll(`.${styles.dateLabel}`).text(date.toLocaleDateString())
        return pair[1].filter(d => d.cases > 0)
    }

    const color = scaleSequential([0, 100], interpolateReds)
    const casesColor = scaleSequential([0, 500], interpolateBlues)
    const svg = select(<svg viewBox={[0, 0, width, height]} width={width} height={height}/>)
    const casesSvg = select(<svg viewBox={[0, 0, width, height]} width={width} height={height}/>)

    const path = geoPath()

    const deathGroup = svg.append(() => <g />)

    svg.append(() => <g />)
        .selectAll('path')
        .data(states)
        .join(
            enter => enter.append(d => <path stroke='#ccc' stroke-linejoin='round' fill='none' d={path(d)}/>)
        )

    casesSvg.append(() => <g />)
        .selectAll('path')
        .data(states)
        .join(
            enter => enter.append(d => <path stroke='#ccc' stroke-linejoin='round' fill='none' d={path(d)}/>)
        )

    const casesGroup = casesSvg.append(() => <g />)

    const updateCases = (data) => {
        casesGroup
        .selectAll('path')
        .data(data, d => d.id)
        .join(
            enter => enter.append(d => <path stroke='#ccc' stroke-linejoin='round' fill='none' d={path(d.feature)}/>),
            update => update.call(update => update.transition().style('fill', d => casesColor(d.cases)))
        )
    }

    const update = (data) => {
        deathGroup
        .selectAll('path')
        .data(data, d => d.id)
        .join(
            enter => enter.append(d => <path stroke='#ccc' stroke-linejoin='round' fill={color(d.deaths)} d={path(d.feature)}/>),
            update => update.call(update => update.transition().style('fill', d => color(d.deaths)))
        )
    }

    var counter = 0
    setInterval(() => {
        if (counter >= [...mapped].length) {
            counter = 0
            return
        }
        const day = getDay(counter)
        const casesDay = getCasesDay(counter)
        updateCases(casesDay)
        update(day)
        counter++
    }, 250)

document.body.appendChild(
    <>
        <h1>COVIZ-19</h1>
        <h1>Cases</h1>
            <p className={styles.dateLabel}/>
            {casesSvg.node()}
            <h1>Deaths</h1>
            <p className={styles.dateLabel}/>
            {svg.node()}
        </>)
})