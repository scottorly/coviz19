//Copyright © 2020 Scott Orlyck.

import styles from './styles.css'
import { csvParse } from 'd3-dsv'
import { timeParse, timeFormat } from 'd3-time-format'
import { group, extent, max } from 'd3-array'
import { timeDay } from 'd3-time'
import { select  } from 'd3-selection'
import { scaleUtc, scaleLinear } from 'd3-scale'
import { line } from 'd3-shape'

const format = '%m-%d-%Y'
const parseDate = timeParse(format)
const formatDate = timeFormat(format)
const template = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/'

const width = 400
const height = 80

const container = select(<div />)

const filter = ({ Province_State }) => Province_State != 'Diamond Princess' && Province_State != 'Grand Princess' && Province_State != 'Recovered'

const daily = async () => {

    const fourTwelve = parseDate('4-12-2020')
    const now = new Date()
    const dates = timeDay.range(fourTwelve, now)
    const requests = dates.map(async date => {
        const response = await fetch(`${template}${formatDate(date)}.csv`)
        const csv = await response.text()
        const parsed = csvParse(csv).filter(filter)
        const grouped = group(parsed, d => d.Province_State)
        return [date, grouped]
    })

    const data = await Promise.all(requests)
    
    const x = scaleUtc()
        .domain(extent(dates))
        .range([0, width])
    
    const flattened = data.flatMap(([date, d]) => 
        [...d].map(([_, v]) => (
            { date, ...v[0] }
        ))
    )

    const flatGroup = group(flattened, d => d.Province_State)

    const paths = [...flatGroup].map(([k ,v]) =>  {
        const domain = extent(v, d => +d.Confirmed)
        const y = scaleLinear().domain(domain).range([height, 0]) 
        const path = line()
            .x(d => x(d.date))
            .y(d => y(+d.Confirmed))
        const pathMap = new Map()

        const deaths = line()
        .x(d => x(d.date))
        .y(d => scaleLinear()
            .domain(extent(v, d => +d.Deaths))
            .range([height, 0])(+d.Deaths)
        )

        const active = line()
        .x(d => x(d.date))
        .y(d => scaleLinear()
            .domain(extent(v, d => +d.Active))
            .range([height, 0])(+d.Active)
        )

        const recovered = line()
        .x(d => x(d.date))
        .y(d => scaleLinear()
            .domain(extent(v, d => +d.Recovered))
            .range([height, 0])(+d.Recovered)
        )

        const incidence = line()
        .x(d => x(d.date))
        .y(d => scaleLinear()
            .domain(extent(v, d => +d.Incident_Rate))
            .range([height, 0])(+d.Incident_Rate)
        )

        const hospitlization = line()
        .x(d => x(d.date))
        .y(d => scaleLinear()
            .domain(extent(v, d => +d.Hospitilzation_Rate))
            .range([height, 0])(+d.Hospitilzation_Rate)
        )

        const mortality = line()
        .x(d => x(d.date))
        .y(d => scaleLinear()
            .domain(extent(v, d => +d.Mortality_Rate))
            .range([height, 0])(+d.Mortality_Rate)
        )

        const testing = line()
        .x(d => x(d.date))
        .y(d => scaleLinear()
            .domain(extent(v, d => +d.Testing_Rate))
            .range([height, 0])(+d.Testing_Rate)
        )

        pathMap.set('confirmed', path)
        pathMap.set('deaths', deaths)
        pathMap.set('active', active)
        pathMap.set('recovered', recovered)
        pathMap.set('incidence', incidence)
        pathMap.set('hospitlization', hospitlization)
        pathMap.set('mortality', mortality)
        pathMap.set('testing', testing)

        return [k, pathMap]
    })

    const ys = new Map([...paths])
    console.log(flatGroup)
   const rows = container
        .selectAll('ul')
        .data([...flatGroup], d => d[0])
        
    const rowsUpdate = rows
        .join(enter => enter.append(([state, d]) => <ul />))

    rowsUpdate.selectAll('li')
        .data(([_, d]) => d)
        .join(
            enter => enter.append(d => <li>
                <svg>
                    <g />
                </svg>
            </li>)
        )

}

const StatesDaily = () => (<>
    <h1> US States daily reports</h1>
    <h1 className={styles.dateLabel} />
    <h1 className={styles.totalLabel} />
    { container.node() }
</>)

export { StatesDaily as default, daily }