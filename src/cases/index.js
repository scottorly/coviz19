//Copyright © 2020 Scott Orlyck.

import styles from './styles.css'
import svg from './map'
import Legend from './legend'
import { select } from 'd3-selection'
import { interpolateBuPu, interpolatePuRd } from 'd3-scale-chromatic'

let state = 'cases'

const ConfirmedCases = () => (
    <>
        <div id={styles.legends}>
            <div className={styles.control}>
                <label className={styles.label}>Cases</label>
                <h1 id={styles.totalLabel}>0</h1>
                <button 
                    id={styles.caseSwitch}
                    className={`${styles.switches} ${styles.selected}`}
                    eventListener={['click', function() {
                        if (state == 'cases') return
                        state = 'cases'
                        select(this).classed(styles.selected, true)
                        select(`#${styles.deathSwitch}`).classed(styles.selected, false)
                        window.dispatchEvent(new CustomEvent('toggle', { detail: { state }}))
                    }]}
                >Cases</button>
                <Legend
                    domain={[1, 10000]}
                    width={320}
                    color={interpolateBuPu}
                    label='COVID-19 cases per 100k' 
                />
            </div>
            <h1 id={styles.dateLabel}>1/22/2020</h1>
            <div className={styles.control}>
                <label className={styles.label}>Deaths</label>
                <h1 id={styles.deathLabel}>0</h1>
                <button 
                    id={styles.deathSwitch}
                    className={`${styles.switches}`}
                    eventListener={['click', function() {
                        if (state == 'deaths') return
                        state = 'deaths'
                        select(this).classed(styles.selected, true)
                        select(`#${styles.caseSwitch}`).classed(styles.selected, false)
                        window.dispatchEvent(new CustomEvent('toggle', { detail: { state }}))
                    }]}
                >Deaths</button>
                <Legend
                    domain={[1, 1000]}
                    width={320}
                    color={interpolatePuRd}
                    label='COVID-19 deaths per 100k' />
            </div>
        </div>
        { svg }
    </>
)

export default ConfirmedCases