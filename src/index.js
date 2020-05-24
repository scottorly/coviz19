//Copyright © 2020 Scott Orlyck.

import styles from './styles.css'
import Deaths from './deaths'
import ConfirmedCases from './cases'

document.body.appendChild(
    <div id={styles.app}>
        <ConfirmedCases />
        <Deaths />
        <div className={styles.footer}>
            <a href="https://github.com/CSSEGISandData/COVID-19">Novel Coronavirus (COVID-19) Cases data provided by JHU CSSE</a>
        </div>
    </div>

)
