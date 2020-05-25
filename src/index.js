//Copyright © 2020 Scott Orlyck.

import styles from './styles.css'
import ConfirmedCases, { cases } from './cases'
import Deaths, { deaths } from './deaths'
import { transition } from 'd3-transition'
import { easeQuadIn } from 'd3-ease'

document.body.appendChild(
    <div id={styles.app}>
        <ConfirmedCases />
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

Promise.all([cases(), deaths()]).then(() => {
    let interval
    interval = setInterval(() => {
        const t = transition().duration(500).ease(easeQuadIn)
        window.dispatchEvent(new CustomEvent('tick'), { details: transition })
    }, 500)
})
