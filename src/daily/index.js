//Copyright © 2020 Scott Orlyck.

import styles from './styles.css'
import { csvParse } from 'd3-dsv'
import { timeParse, timeFormat } from 'd3-time-format'
import { group, extent, max } from 'd3-array'
import { timeDay } from 'd3-time'
import { select , selectAll } from 'd3-selection'
import { scaleUtc, scaleLinear } from 'd3-scale'
import { line } from 'd3-shape'

const format = '%m-%d-%Y'
const parseDate = timeParse(format)
const formatDate = timeFormat(format)
const template = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/'

const width = 400
const height = 80

const svg = select(<svg viewBox={[0, 0, width, height]} width={width} height={height}/>)

const container = <div />

const daily = async () => {

    const fourTwelve = parseDate('4-12-2020')
    const now = new Date()
    const dates = timeDay.range(fourTwelve, now)
    const requests = dates.map(async date => {
        const response = await fetch(`${template}${formatDate(date)}.csv`)
        const csv = await response.text()
        const grouped = group(csvParse(csv), d => d.Province_State)
        return [date, grouped]
    })

    const data = await Promise.all(requests)
    
    const x = scaleUtc()
    .domain(extent(dates))
    .range([0, width])
    
    const flattened = data.flatMap(([date, d]) => 
        [...d].map(([_, v]) => (
            { date, ...v[0]}
        ))
    )

    const flatGroup = group(flattened, d => d.Province_State)
    console.log(flatGroup)

    const paths = [...flatGroup].map(([k ,v]) =>  {
        const domain = extent(v, d => +d.Confirmed)
        console.log(domain)
        const y = scaleLinear().domain(domain).range([height, 0]) 
        const path = line()
            .x(d => x(d.date))
            .y(d => y(+d.Confirmed))
        return [k, path]
    })

    const ys = new Map([...paths])
    console.log(ys)
    select(container).selectAll('svg')
        .data([...flatGroup])
        .join(
            enter => enter
                .append(([state, d]) => (
                <svg width={width} height={height} viewBox={[0, 0, width, height]}> 
                        <text transform='translate(0, 20)'>{ state } </text>
                        <path 
                            stroke='#ccc' 
                            stroke-linejoin='round'
                            fill='none'
                             d={ys.get(state)(d)}/>
                </svg>)
            )
        )
}

const StatesDaily = () => (<>
    <h1> US States daily reports</h1>
    <h1 className={styles.dateLabel} />
    <h1 className={styles.totalLabel} />
    { container }
</>)

export { StatesDaily as default, daily }