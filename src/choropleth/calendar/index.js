import styles from '../styles.css'
import { select } from 'd3-selection'
import { timeWeek } from 'd3-time'
import { axisLeft, axisBottom } from 'd3-axis'
import { scaleUtc, scaleBand } from 'd3-scale'
import { extent, bisectLeft } from 'd3-array'
import { timeFormat } from 'd3-time-format'
import PopUp from '../map/popup'
import { updateCounter } from '../controls'

const formatDate = timeFormat('%m/%d/%y')
let dates

const rectListeners = { eventListeners : [
    ['mouseleave', e => select(popup).transition().style('opacity', 0)],
    ['mouseover', function(e) {
        const cell = select(this)
        const rect = this.getBoundingClientRect()
        const [[date, total]] = cell.data()
        select(popup)
            .transition().duration(0)
            .style('opacity', 0.75)
            .style('top', `${rect.top + window.scrollY - 72}px`)
            .style('left', `${rect.left + 32}px`)
            .select('p')
            .text(`${formatDate(date)} : ${total}`)
    }],
    ['click', function() {
        const rect = select(this)
        const [[date, _]] = rect.data()
        const counter = bisectLeft(dates, date)
        updateCounter(counter)
    }]
]}

const popup = <PopUp />
document.body.appendChild(popup)

const cellSize = 18.5
const height = cellSize * 8
const days = ['Sun','Mon','Tue','Wed','Th','Fri','Sat']

const y = scaleBand().domain(days).range([0, 129])
const yAxis = axisLeft(y).tickSize(0).ticks(7)

const Calendar = ({ children, attributes: { d, color }}) => {
    dates = d.map(([date, _]) => date)
    const justDates = extent(dates)
    const weeks = timeWeek.count(...justDates) + 1
    const width = (weeks * cellSize) + 40
    const props = {
        width,
        height,
        viewBox: [0,0, width, height]
    }
    const svg = select(<svg {...props} className={styles.calendar}/>)
    const rectz = svg.append(() => <g transform={'translate(36, 0)'} />)

    const x = scaleUtc().domain(justDates).range([0, width - 40])
    const xAxis = axisBottom(x).tickSize(0).ticks(12)

    svg.append(() => <g transform='translate(34, 0)' className={styles.calAxis}/>)
        .call(yAxis)
        .select(".domain")
        .remove()
    svg.append(() => <g transform='translate(36, 132)' className={styles.calAxis}/>)
        .call(xAxis)
        .select(".domain")
        .remove()

    const update = (data, t) => {
        rectz.selectAll('rect')
        .data(data, ([date, _]) => date)
        .join(enter => 
            enter.append(([date, total]) => 
                <rect 
                    fill={color(total)}
                    width={18}
                    height={18}
                    x={timeWeek.count(justDates[0], date) * cellSize} 
                    y={date.getDay() * cellSize}
                    {...rectListeners}
                />
            ).call(enter => {
                if (t != null) {
                    enter.transition(t).attr('opacity', 1)
                } else {
                    enter.attr('opacity', 1)
                }
                return enter
            }),
            update => update,
            exit => exit.call(exit => exit.transition(t).attr('opacity', 0).remove()))
    }

    update([])

    window.addEventListener('tick', e => {
        const counter = e.detail.counter + 1
        const t = e.detail.t
        const data = [...d]
        data.splice(counter)
        update(data, t)
    })

    return <>
        <div className={styles.calendarLabel}>
            { children }
        </div>
        { svg.node() }
    </>
}

export default Calendar