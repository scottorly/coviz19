//Copyright © 2020 Scott Orlyck.

import styles from './styles.css'
import { feature } from 'topojson-client'
import ConfirmedCases, { cases } from './cases'
import Controls from './controls'


document.body.appendChild(
    <div id={styles.app}>
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

Promise.all([
    fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json'),
    fetch(`https://api.census.gov/data/2018/pep/population?get=POP&for=county`)
]).then(async ([featuresRequest, censusRequest])  => {
    const features = await featuresRequest.json()
    const population = await censusRequest.json()
    const states = feature(features, features.objects.states).features
    const counties = feature(features, features.objects.counties).features
    cases(states, counties, population)
})

