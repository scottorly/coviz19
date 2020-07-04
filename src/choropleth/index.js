//Copyright © 2020 Scott Orlyck.

import styles from './styles.css'
import svg from './map'
import Legend from './legend'
import Controls from './controls'
import { select } from 'd3-selection'
import { interpolateBuPu, interpolatePuRd } from 'd3-scale-chromatic'

let state = 'cases'

const Choropleth = () => (
    <div id={styles.map}>
        <div id={styles.legends}>
            <div className={styles.counter}>
                <label>total confirmed cases</label><h1 id={styles.totalLabel}>0</h1>
                <label>new cases per day</label><h1 id={styles.newCases}>0</h1>
            </div>
            <div className={styles.counter}>
                <label>total confirmed deaths</label>
                <h1 id={styles.deathLabel}>0</h1>
                <label>new deaths per day</label>
                <h1 id={styles.newDeaths}>0</h1>
            </div>
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
                    <h1>Cases</h1>
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
                    <h1>Deaths</h1>
                    <Legend
                        domain={[1, 1000]}
                        width={320}
                        color={interpolatePuRd}
                        label='COVID-19 deaths per 100k' />
                    </button>
            </div>
        </div>
        <div id={styles.mapContainer}>
            { svg }
            <h1 id={styles.dateLabel}>1/22/2020</h1>
            <Controls />
        </div>
    </div>
)

export default Choropleth