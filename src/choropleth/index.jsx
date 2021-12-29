//Copyright © 2020 Scott Orlyck.

import styles from './styles.module.css'
import svg from './map'
import Legend from './legend'
import Controls from './controls'
import { select } from 'd3-selection'
import { interpolateBuPu, interpolatePuRd } from 'd3-scale-chromatic'

let state = 'cases'

const Choropleth = () => (
    <>
        <div id={styles.map}>
            <div id={styles.legends}>
                <div className={styles.counter}>
                    <h1 id={styles.title}>COVIZ-19</h1>
                    <label>total cases</label>
                    <h1 id={styles.totalLabel}>0</h1>
                    <label>total deaths</label>
                    <h1 id={styles.deathLabel}>0</h1>
                </div>
                <div className={styles.control}>   
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
                    >
                        <h1>Cases</h1>
                    </button>
                    <Legend
                        domain={[1, 100000]}
                        width={320}
                        color={interpolateBuPu}
                        label='COVID-19 cases per 100k' 
                    />
                </div>
                <div className={styles.control}>
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
                    >
                        <h1>Deaths</h1>
                    </button>
                    <Legend
                        domain={[1, 1000]}
                        width={320}
                        color={interpolatePuRd}
                        label='COVID-19 deaths per 100k' />
                </div>
            </div>
            <div id={styles.mapContainer}>
                { svg }
            </div>
        </div>
        <div id={styles.playback}>
            <h1 id={styles.dateLabel}>1/22/2020</h1>
            <Controls />
        </div>
    </>
)

export default Choropleth