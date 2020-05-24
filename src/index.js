//Copyright © 2020 Scott Orlyck.

import styles from './styles.css'
import Deaths, { deaths } from './deaths'
import ConfirmedCases, { cases } from './cases'
// import Daily from './daily'

document.body.appendChild(
    <div id={styles.app}>
        <ConfirmedCases />
        <Deaths />
        {/* <Daily /> */}
        <div className={styles.footer}>
            <a href="https://github.com/CSSEGISandData/COVID-19">Novel Coronavirus (COVID-19) Cases data provided by JHU CSSE</a>
        </div>
    </div>

)

Promise.all([cases(), deaths()]).then(() => {
    let interval
    interval = setInterval(() => {
        window.dispatchEvent(new CustomEvent('tick'))
    }, 500)
})
