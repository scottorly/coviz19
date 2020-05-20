import styles from './styles.css'
import multiline from './multiline'
import node, { start } from './bars'
import spline from './spline'
import User from './form'
import Clock from './clock'

document.body.appendChild(
    <>
        <Clock />
        <User />
        <div className={styles.bars}>
            <h1>Brand Bar Chart Race</h1>
            {node}
            <button eventListener={['click', e => {
                start()
            }]}>
                replay
            </button>
        </div>

        <h1>Multi Line with Tooltip</h1>
        {multiline}

        {spline}
    </>
)

window.dispatchEvent(new CustomEvent('mount'))
start()