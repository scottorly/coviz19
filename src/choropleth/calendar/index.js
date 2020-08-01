import styles from '../styles.css'
import { select } from 'd3-selection'
import { timeWeek } from 'd3-time'
import { axisLeft, axisBottom } from 'd3-axis'
import { scaleUtc, scaleBand } from 'd3-scale'
import { extent } from 'd3-array'
import { timeFormat } from 'd3-time-format'
import PopUp from '../map/popup'

const formatDate = timeFormat('%m/%d/%y')

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
    }]
]}

const popup = <PopUp />
document.body.appendChild(popup)

const cellSize = 16

const days = ['Sun','Mon','Tue','Wed','Th','Fri','Sat']

const y = scaleBand().domain(days).range([0, 112])
const yAxis = axisLeft(y).tickSize(0).ticks(7)

const Calendar = ({ children, attributes: { d, color, title }}) => {
    const justDates = extent(d.map(([date, _]) => date))
    const weeks = timeWeek.count(...justDates) + 1
    const width = (weeks * cellSize) + 40
    const props = {
        width,
        height: 136
    }
    const svg = select(<svg {...props} />)
    const rectz = svg.append(() => <g transform={'translate(36, 0)'} />)

    const x = scaleUtc().domain(justDates).range([0, width - 40])
    const xAxis = axisBottom(x).tickSize(0).ticks(12)

    svg.append(() => <g transform='translate(34, 0)'/>)
        .call(yAxis)
        .select(".domain")
        .remove()
    svg.append(() => <g transform='translate(36, 112)'/>)
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
                    width={14}
                    height={14}
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