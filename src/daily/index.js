//Copyright © 2020 Scott Orlyck.

import styles from './styles.css'
import { csvParse } from 'd3-dsv'
import { timeParse, timeFormat } from 'd3-time-format'
import { group } from 'd3-array'
import { timeDay } from 'd3-time'
import { select  } from 'd3-selection'
import Multiple from './multiples'

const format = '%m-%d-%Y'
const parseDate = timeParse(format)
const formatDate = timeFormat(format)
const template = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/'

const container = select(
    <div>
        <input type='text' eventListener={['input', function() {
            console.log(this.value)
        }]}/>
        <ul id={styles.states} />
    </div>
)

const filter = ({ Province_State }) => Province_State != 'Diamond Princess' && Province_State != 'Grand Princess' && Province_State != 'Recovered';

 (async () => {

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
    
    const flattened = data.flatMap(([date, d]) => 
        [...d].map(([_, v]) => {
            return { date, ...v[0] }
        }))

    const flatGroup = group(flattened, d => d.Province_State)

    container.select('ul')
        .selectAll('li')
        .data([...flatGroup], ([state, _]) => state)
        .join(
            enter => enter.append(d => 
                <li>
                   <Multiple d={d} />
                </li>
            ))
})()

const StatesDaily = () => (<>
    <h1> US States daily reports</h1>
    <h1 className={styles.dateLabel} />
    <h1 className={styles.totalLabel} />
    { container.node() }
</>)

export default StatesDaily 
