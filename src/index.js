//Copyright © 2020 Scott Orlyck.

import styles from './styles.css'
import { feature } from 'topojson-client'
import ConfirmedCases, { cases } from './cases'
import Deaths, { deaths } from './deaths'
import Controls from './controls'

document.body.appendChild(
    <div id={styles.app}>
        <div>
            <ConfirmedCases />
        </div>
        <Controls />    
        <div>
            <Deaths />
        </div>
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

Promise.all([
    fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json'),
    fetch(`https://api.census.gov/data/2018/pep/population?get=POP&for=county`)
]).then(async ([featuresRequest, censusRequest])  => {
    const features = await featuresRequest.json()
    const population = await censusRequest.json()
    const states = feature(features, features.objects.states).features
    const counties = feature(features, features.objects.counties).features
    cases(states, counties, population)
    deaths(states, counties, population)
})

