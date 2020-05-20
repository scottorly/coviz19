import styles from './styles.css'
import multiline from './multiline'
import node, { start } from './bars'
import spline from './spline'
import User from './form'
import Clock from './clock'

document.head.appendChild(<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />)

document.body.appendChild(
    <div id={styles.app}>

        <h1>Swiss Clock</h1>
        <p>Adapted from <a href="https://observablehq.com/@mbostock/swiss-clock">https://observablehq.com/@mbostock/swiss-clock</a></p>
        <Clock />

        <h1>Form Data Binding Example</h1>
        <User />
        <p>
            <a href="https://github.com/ScottORLY/d3activated/blob/master/src/form/index.js">source</a>
        </p>

        <h1>Brand Bar Chart Race</h1>
        <p>Adapted from <a href="https://observablehq.com/@d3/bar-chart-race-explained"> https://observablehq.com/@mbostock/swiss-clock</a></p>
        <button eventListener={['click', e => {
            start()
        }]}>
            replay
        </button>
        { node }

        <h1>Multi Line with Tooltip</h1>
        {multiline}
        <p>
            <a href="https://github.com/ScottORLY/d3activated/blob/master/src/multiline/index.js">source</a>
        </p>

        <h1>Real-time spline</h1>
        { spline }
        <p>
            <a href="https://github.com/ScottORLY/d3activated/blob/master/src/spline/index.js">source</a>
        </p>
    </div>
)

window.dispatchEvent(new CustomEvent('mount'))
start()