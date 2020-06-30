//Copyright © 2020 Scott Orlyck.

import styles from './styles.css'
import Choropleth from './choropleth'

mixpanel.track("Page View")

document.body.appendChild(
    <div id={styles.app}>
        <div>
            <Choropleth />
        </div>
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
