//Copyright © 2020 Scott Orlyck.

import styles from './styles.css'
import svg from './map'
import Legend from './legend'
import Controls from './controls'
import { select } from 'd3-selection'
import { interpolateBuPu, interpolatePuRd } from 'd3-scale-chromatic'

let state = 'cases'

const Choropleth = () => (
    <>
        <div id={styles.mapContainer}>
            <Controls />
            { svg }
        </div>
        <div id={styles.legends}>
            <div className={styles.control}>
                <button 
                    id={styles.caseSwitch}
                    className={`${styles.switches} ${styles.selected}`}
                    eventListener={['click', function() {
                        if (state == 'cases') return
                        mixpanel.track("Cases View")
                        state = 'cases'
                        select(this).classed(styles.selected, true)
                        select(`#${styles.deathSwitch}`).classed(styles.selected, false)
                        window.dispatchEvent(new CustomEvent('toggle', { detail: { state }}))
                    }]}
                >
                    <div className={styles.counter}>
                        <h1>Cases</h1>
                        <h1 id={styles.totalLabel}>0</h1>
                    </div>
                    <Legend
                        domain={[1, 10000]}
                        width={320}
                        color={interpolateBuPu}
                        label='COVID-19 cases per 100k' 
                    />
                </button>
            </div>
            <div className={styles.control}>
                <button 
                    id={styles.deathSwitch}
                    className={`${styles.switches}`}
                    eventListener={['click', function() {
                        if (state == 'deaths') return
                        mixpanel.track("Deaths View")
                        state = 'deaths'
                        select(this).classed(styles.selected, true)
                        select(`#${styles.caseSwitch}`).classed(styles.selected, false)
                        window.dispatchEvent(new CustomEvent('toggle', { detail: { state }}))
                    }]}
                >
                    <div className={styles.counter}>
                        <h1>Deaths</h1>
                        <h1 id={styles.deathLabel}>0</h1>
                    </div>
                    <Legend
                        domain={[1, 1000]}
                        width={320}
                        color={interpolatePuRd}
                        label='COVID-19 deaths per 100k' />
                    </button>
            </div>
        </div>

    </>
)

export default Choropleth