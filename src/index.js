import styles from './styles.css'
import multiline from './multiline'
import node, { start } from './bars'
import spline from './spline'

document.body.appendChild(
    <>
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

start()