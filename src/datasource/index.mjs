import { csvParse } from 'd3-dsv'
import { group, sum } from 'd3-array'
import fetch from 'node-fetch'
import { feature } from 'topojson-client'
import { timeParse } from 'd3-time-format'
import { scaleSequentialLog } from 'd3-scale'
import fs from 'fs'
import { interpolateBuPu, interpolatePuRd } from 'd3-scale-chromatic'
import pkg from '@discoveryjs/json-ext';
import _ from 'lodash'
import { exit } from 'process'

const { stringifyStream } = pkg;

(async () => {
    const domain = [1, 100000]
    const parseDate = timeParse("%m/%d/%y")

    const populationResponse = await fetch('https://api.census.gov/data/2018/pep/population?get=POP&for=county')

    const featureResponse = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json')

    const features = await featureResponse.json()
    const population = await populationResponse.json()
    
    const cases = await fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv')

    const deaths = await fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv')

    const deathsCsv = await deaths.text()
    const covidCases = await cases.text()
    
    const color = scaleSequentialLog(interpolateBuPu).domain(domain)
    const deathsColor = scaleSequentialLog(interpolatePuRd).domain([1,1000])

    const counties = feature(features, features.objects.counties).features

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

    const parsedDates = dates.map(parseDate)

    const totals = []
    const newCases = []
    const newDeaths = []
    const deathTotals = []
    const newNew = []
    const newNewNew = []

    casesMapped.forEach((d, i) => {
        const cases = sum(d[1], d => d.total)
        const deaths = sum(d[1], d => d.totalDeaths)
        totals.push(cases)
        deathTotals.push(deaths)

        const casesYesterday = totals[i - 1] || 0
        const newCasesToday = cases - casesYesterday
        newCases.push(newCasesToday)

        const deathsYesterday = deathTotals[i - 1] || 0
        const newDeathsToday = deaths - deathsYesterday
        newDeaths.push(newDeathsToday)
        const date = parsedDates[i]
        newNew.push([date, newCasesToday])
        newNewNew.push([date, newDeathsToday])
    })

    const chuncked = _.chunk(casesMapped, 50)

    const manifestJson = JSON.stringify({ count: chuncked.length })

    fs.writeFile('./src/datasource/manifest.json', manifestJson, (error) => {
        if (error) {
            console.log(error)
        }
    })
    
    stringifyStream({totals, newCases, newDeaths, deathTotals, newNew, newNewNew}).pipe(fs.createWriteStream('./src/datasource/totals.json'))

    let count = 0
    await Promise.all(chuncked.map(item => {
        count++
        return new Promise((resolve, reject) => {
            stringifyStream(item)
            .on('error', reject)
            .pipe(fs.createWriteStream(`./src/datasource/cases${count}.json`))
            .on('error', reject)
            .on('finish', resolve)
        })
    }))
    exit(1)
})()