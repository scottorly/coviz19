import { timeParse, timeFormat } from 'd3-time-format'
import { group } from 'd3-array'
import { timeDay } from 'd3-time'
import { csvParse } from 'd3-dsv'

const format = '%m-%d-%Y'
const parseDate = timeParse(format)
const formatDate = timeFormat(format)
const template = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/'
const filter = ({ Province_State }) => Province_State != 'Diamond Princess' && Province_State != 'Grand Princess' && Province_State != 'Recovered';

let flatGroup

const promise = (async () => {
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
    flatGroup = group(flattened, d => d.Province_State)
    return flatGroup
})()

onmessage = async () => postMessage(await promise)