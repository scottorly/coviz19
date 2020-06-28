//Copyright © 2020 Scott Orlyck.

import styles from './styles.css'
import ConfirmedCases from './cases'
import Controls from './controls'
import mixpanel from 'mixpanel-browser'

document.body.appendChild(
    <div id={styles.app}>
        <h1>COVIZ-19</h1>
        <div>
            <ConfirmedCases />
        </div>
        <Controls /> 

        <div className={styles.footer}>
            <h4>Datasources:</h4>
            <p>
                <a href="https://github.com/CSSEGISandData/COVID-19">
                    COVID-19 Data Repository by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University
                </a>
            </p>
            <p>
                <a href="https://api.census.gov/data/2018/pep/population?get=POP&for=county">
                    US Census
                </a>
            </p>
        </div>
    </div>
)

mixpanel.init('d5a4311d045c79b449719cd17223e378')
mixpanel.track("Page View")
window.mixpanel = mixpanel
