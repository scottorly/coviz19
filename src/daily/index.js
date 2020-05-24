//Copyright © 2020 Scott Orlyck.

import styles from './styles.css'
import { csvParse } from 'd3-dsv'
import { timeParse, timeFormat } from 'd3-time-format'
import { group, sum } from 'd3-array'
import { timeDay } from 'd3-time'
import { geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import { select , selectAll } from 'd3-selection'
import { StatePath } from '../paths'
const format = '%m-%d-%Y'
const parseDate = timeParse(format)
const formatDate = timeFormat(format)
const template = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/'

const width = 975
const height = 610

const svg = select(<svg viewBox={[0, 0, width, height]} width={width} height={height}/>)

const daily = async () => {
    const counties = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json')
    const us = await counties.json()
    const states = feature(us, us.objects.states).features

    const path = geoPath()
    svg.append(() => <g />)
        .selectAll('path')
        .data(states)
        .join(
            enter => enter.append(d => <StatePath d={d} />)
        )
      
    const fourTwelve = parseDate('4-12-2020')
    const now = new Date()
    const dates = timeDay.range(fourTwelve, now)
    const requests = dates.map(async d => {
        const date = formatDate(d)
        const response = await fetch(`${template}${date}.csv`)
        const csv = await response.text()
        return [date, group(csvParse(csv), d => d.Province_State)]
    })

    const data = await Promise.all(requests)
    const byDay = new Map([...data])
    return byDay
}

daily()

const Dailys = () => (<>
    <h1> US States daily reports</h1>
    <h1 className={styles.dateLabel} />
    <h1 className={styles.totalLabel} />
    { svg.node() }
    <a href="https://github.com/ScottORLY/coviz19/blob/master/src/daily/index.js">source code</a>
</>)

export default Dailys