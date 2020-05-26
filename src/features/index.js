//Copyright © 2020 Scott Orlyck.

import { feature } from 'topojson-client'

let json;

(async function () {
    const request = fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json')
    const response = await request
    if (json == null) {
        json = await response.json()
    }
})()

const stateFeatures = async () => {
    const states = feature(json, json.objects.states).features
    return states
}

const countyFeatures = async () => {
    const counties = feature(json, json.objects.counties).features
    return counties
}

export { stateFeatures, countyFeatures }