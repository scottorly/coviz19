//Copyright © 2020 Scott Orlyck.

import styles from '../styles.css'
import { select } from 'd3-selection'
import { transition } from 'd3-transition'
import { easeLinear } from 'd3-ease'
import { timeParse } from 'd3-time-format'
import { timeDay } from 'd3-time'
import { scaleUtc } from 'd3-scale'
import { drag } from 'd3-drag'
import { axisBottom } from 'd3-axis'
import { extent, bisect  } from 'd3-array'
import { interval } from 'd3-timer'

const format = '%m-%d-%Y'
const parseDate = timeParse(format)
const jan = parseDate('1-22-2020')
const now = new Date()
const dates = timeDay.range(jan, now)
const width = dates.length * 6
const height = 100
const viewBox = [0,0, width, height]
const props = {
    viewBox,
    id: styles.slider
}

var counter = -1
const Slider = ({ attributes: { eventListener }}) => {

    const x = scaleUtc()
        .domain(extent(dates))
        .range([0, width])
        
    const svg = select(<svg {...props} eventListener={['click', function(e) {
        const pt = this.createSVGPoint()
        pt.x = e.clientX
        pt.y = e.clientY
        const cursor = pt.matrixTransform(this.getScreenCTM().inverse())
        const date = x.invert(cursor.x)
        counter = bisect(dates, date)
        const t = transition().ease(easeLinear)
        const detail = { detail: { counter, t }}
        window.dispatchEvent(new CustomEvent('tick', detail))
        select('circle').transition(t).attr('cx', counter * 6)
    }]}/>)

    const slider = svg.append(() => <g />)
 
    slider.append(() => <g transform='translate(0, 44)' className={styles.axis}/>).call(axisBottom(x).ticks(5))

    slider.insert(() => <circle transform='translate(0, 44)' className={styles.circle} r={12}/>)
        .call(drag()
        .on("drag", function(event) {
            select(this).attr('cx', () => {
                const value = event.x
                if (value < 0) { 
                    return 0 
                }
                if (value > width) {
                    return width
                }
                const tick = parseInt(value / 6)
                eventListener(tick)
                return value
            })
        }))
    return svg.node()
}

const Controls = () => {
    
    let state = 'stop'

    interval(() => {
        if (state == 'start' && counter <= dates.length) {
            counter++
            const t = transition().duration(500).ease(easeLinear)
            select('circle').transition(t).attr('cx', counter * 6)
            const detail = { detail: { t, counter }}
            window.dispatchEvent(new CustomEvent('tick', detail))
        }
        if (counter > dates.length) {
            state = 'stop'
            select(`.${styles.button}`).text(state == 'start' ? 'stop' : 'start')
        }
    }, 500)

    return (
        <>
            <div id={styles.controls}>
                <div id={styles.startContainer}>
                    <button 
                        className={styles.button}
                        eventListener={['click', function() {
                            state = state == 'start' ? 'stop' : 'start'
                            mixpanel.track(state)
                            select(this).text(state == 'start' ? 'stop' : 'start')
                        }]}>start</button>
                </div>
                <Slider 
                    eventListener={(value) => {
                        state = 'stop'
                        select(`.${styles.button}`).text(state == 'start' ? 'stop' : 'start')
                        counter = value
                        const t = null
                        const detail = { detail: { counter, t }}
                        window.dispatchEvent(new CustomEvent('tick', detail))
                    }}
                />
            </div>
            <div id={styles.calendarContainer} />
        </>
    )
}

const updateCounter = i => {
    counter = i
    const t = transition().ease(easeLinear)
    const detail = { detail: { counter, t }}
    window.dispatchEvent(new CustomEvent('tick', detail))
    select('circle').transition(t).attr('cx', counter * 6)
}

export { Controls as default, updateCounter }