import population from './population.json'
import { csvParse } from 'd3-dsv'
import { feature } from 'topojson-client'
import { scaleSequentialLog } from 'd3-scale'
import { group, sum } from 'd3-array'
import { interpolateBuPu, interpolatePuRd } from 'd3-scale-chromatic'

const domain = [1, 10000]

const color = scaleSequentialLog(interpolateBuPu).domain(domain)
const deathsColor = scaleSequentialLog(interpolatePuRd).domain([1,1000])

onmessage = async (message) => {
    const features = message.data
    const counties = feature(features, features.objects.counties).features
            
    const cases = await fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv')
    const covidCases = await cases.text()

    const deaths = await fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv')
    const deathsCsv = await deaths.text()

    const rows = population.slice(1) 
        .map(([population, state, county]) => [`${state}${county}`, +population])
    const popByCounty = new Map(rows)

    const casesData = csvParse(covidCases).filter(d => d.UID.slice(3).length > 0)
    const deathsData = csvParse(deathsCsv).filter(d => d.UID.slice(3).length > 0)

    const featuresById = group(counties, feature => feature.id)

    const sample = casesData[0]
    const march = parseDate('2/29/20')
    const dates = Object.keys(sample).filter(parseDate).filter(d => parseDate(d) > march)

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

    postMessage({ totals, deathTotals, casesMapped })
}