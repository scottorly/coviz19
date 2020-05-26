//Copyright © 2020 Scott Orlyck.

import styles from './styles.css'
import ConfirmedCases, { cases } from './cases'
import Deaths, { deaths } from './deaths'
import Controls from './controls'

document.body.appendChild(
    <div id={styles.app}>
        <ConfirmedCases />
        <Controls />
        <Deaths />
        <div className={styles.footer}>
            <p>
                <a href="https://github.com/CSSEGISandData/COVID-19">Novel Coronavirus (COVID-19) Cases data provided by JHU CSSE</a>
            </p>
            <p>
                <a href="https://api.census.gov/data/2018/pep/population?get=POP&for=county">Population data from US Census</a>
            </p>
        </div>
    </div>
)

cases()
deaths()
