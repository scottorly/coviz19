//Copyright © 2020 Scott Orlyck.

import styles from './styles.css'
import ConfirmedCases from './cases'
import StatesDaily, { daily } from './daily'
import Controls from './controls'

document.body.appendChild(
    <div id={styles.app}>
        <div>
            <ConfirmedCases />
        </div>
        <Controls /> 

        <StatesDaily />
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
daily()
