import styles from './styles.css'
import { select, selectAll } from 'd3-selection'
import { timeDay, timeHour, timeMinute } from 'd3-time'
import { range } from 'd3-array'

const updateTime = () => {
    const now = new Date()
    select(`#hand-hours`).transition().attr('transform', `rotate(${(now - timeDay(now)) / 864e5 * 720})`)
    select(`#hand-minutes`).transition().attr('transform', `rotate(${(now - timeHour(now)) / 36e5 * 360})`)
    select(`#hand-seconds`).transition().attr('transform', `rotate(${(now - timeMinute(now)) / 6e4 * 360})`)
}

setInterval(updateTime, 1000)

const Clock = () => (<>
    <svg width="640" height="640" viewBox="50 50 500 500">
        <g transform="translate(300,300)">
            <circle id="face" r="225" stroke-width="20" fill="none" stroke="lightgray"/>
                {
                    range(12).map(i => 
                        (<g id="tick-major" transform={`rotate(${i * 30})`}>
                            <line y1="-203" y2="-153" stroke="black" stroke-width="14" />
                        </g>)
                    )
                }
                {
                    range(60).map(i => i % 5 ? (
                        <g id="tick-minor" transform={`rotate(${i * 6})`}>
                            <line y1="-203" y2="-188" stroke="black" stroke-width="4" />
                        </g>) : (<></>)
                    )
                }
            <g id="hand-hours">   
                <path d="M-13,47h26l-3,-186h-17z" />
            </g>
            <g id="hand-minutes" >
                <path d="M-13,47h26l-3,-240h-17z" />
            </g>
            <g id="hand-seconds">
                <line y1="65" y2="-138" stroke="red" stroke-width="4" />
                <circle cy="-138" r="16" fill="red" />
                <circle r="7.5" fill="red" />
                <circle r="4.5" fill="none" stroke="brown" />
            </g>
        </g>
    </svg>
    <p>
        <a href="https://github.com/ScottORLY/d3activated/blob/master/src/clock/index.js">source</a>
    </p>
</>)

export default Clock