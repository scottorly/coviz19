//Copyright © 2020 Scott Orlyck.

import styles from './styles.css'
import svg from './map'
import Legend from './legend'
import { select } from 'd3-selection'
import { interpolateBuPu, interpolatePuRd } from 'd3-scale-chromatic'

const ConfirmedCases = () => (
    <>
        <h1 id={styles.title}>COVID-19</h1>
        <h1 id={styles.dateLabel}>1/22/2020</h1>
        <div id={styles.legends}>
            <div className={styles.control}>
                <label className={styles.label}>Cases</label>
                <h1 id={styles.totalLabel}>0</h1>
                <button 
                    id={styles.caseSwitch}
                    className={`${styles.switches} ${styles.selected}`}
                    eventListener={['click', function() {
                        select(this).classed(styles.selected, true)
                        select(`#${styles.deathSwitch}`).classed(styles.selected, false)
                        window.dispatchEvent(new CustomEvent('toggle'))
                    }]}
                >Cases</button>
                <Legend
                    domain={[1, 10000]}
                    width={320}
                    color={interpolateBuPu}
                    label='COVID-19 cases per 100k' 
                />
            </div>
            <div className={styles.control}>
                <label className={styles.label}>Deaths</label>
                <h1 id={styles.deathLabel}>0</h1>
                <button 
                    id={styles.deathSwitch}
                    className={`${styles.switches}`}
                    eventListener={['click', function() {
                        select(this).classed(styles.selected, true)
                        select(`#${styles.caseSwitch}`).classed(styles.selected, false)
                        window.dispatchEvent(new CustomEvent('toggle'))
                    }]}
                >Deaths</button>
                <Legend
                    domain={[1, 1000]}
                    width={320}
                    color={interpolatePuRd}
                    label='COVID-19 deaths per 100k' />
            </div>
        </div>
        { svg.node() }
    </>
)

export default ConfirmedCases