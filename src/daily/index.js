//Copyright © 2020 Scott Orlyck.

import styles from './styles.css'
import { select  } from 'd3-selection'
import Multiple from './multiples'
import Worker from './workers/index.worker.js'

let flatGroup

const worker = new Worker()

const container = select(
    <div id={styles.daily}>
        <div id={styles.header}>
            <h1> US States Daily Reports</h1>
            <h1 className={styles.dateLabel} />
            <h1 className={styles.totalLabel} />
            <label className={styles.filterLabel}>filter</label>
            <input
                className={styles.filter}
                type='text' 
                eventListener={['input', function() {
                    const value = this.value
                    const filtered = [...flatGroup].filter(([state, _]) => {
                        return state.toLowerCase().includes(value)
                    })
                    update(filtered)
                }]}
            />
        </div>
        <ul id={styles.states} />
    </div>
)

const update = (data) => {
    container.select('ul')
    .selectAll('li')
    .data(data, ([state, _]) => state)
    .join(
        enter => enter.append(d => 
            <li className={styles.state}>
               <Multiple d={d} />
            </li>
        ), 
        update => update,
        exit => exit.call(exit => 
            exit.transition().style('opacity', 0).remove()
        )
    )
}

worker.postMessage('load')

worker.onmessage = async ({ data }) => {
    flatGroup = data
    update([...flatGroup])
}

const StatesDaily = () => container.node()

export default StatesDaily 
