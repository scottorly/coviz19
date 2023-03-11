import { scaleLinear } from 'd3-scale'
import { line } from 'd3-shape'
import { extent } from 'd3-array'
import { axisLeft } from 'd3-axis'
import { schemeTableau10 } from 'd3-scale-chromatic'

export const ys = (name, v, range, x) => {

    if (name == 'confirmed') {
        const confirmedY = scaleLinear()
            .domain(extent(v, d => +d.Confirmed))
            .range(range)
    
        const confirmed = line()
            .x(d => x(d.date))
            .y(d => confirmedY(+d.Confirmed))
    
        const confirmedAxis = axisLeft(confirmedY).ticks(5)
        return [confirmed, confirmedAxis, schemeTableau10[0]]
    }

    if (name == 'deaths') {
        const deathsY = scaleLinear()
            .domain(extent(v, d => +d.Deaths))
            .range(range)

        const deaths = line()
            .x(d => x(d.date))
            .y(d => deathsY(+d.Deaths))

        const deathsAxis = axisLeft(deathsY).ticks(5)
        return [deaths, deathsAxis, schemeTableau10[2]]
    }

    // if (name == 'active') {
    //     const activeY = scaleLinear()
    //         .domain(extent(v, d => +d.Active))
    //         .range(range)

    //     const active = line()
    //         .x(d => x(d.date))
    //         .y(d => activeY(+d.Active))

    //     const activeAxis = axisLeft(activeY).ticks(5)
    //     return [active, activeAxis, schemeTableau10[1]]
    // }

    // if (name == 'recovered') {
    //     const recoveredY = scaleLinear()
    //         .domain(extent(v, d => +d.Recovered))
    //         .range(range)

    //     const recovered = line()
    //         .x(d => x(d.date))
    //         .y(d => recoveredY(+d.Recovered))

    //     const recoveredAxis = axisLeft(recoveredY).ticks(5)
    //     return [recovered, recoveredAxis, schemeTableau10[4]]
    // }
    // if (name == 'incidence') {
    //     const incidenceY = scaleLinear()
    //         .domain(extent(v, d => +d.Incident_Rate))
    //         .range(range)

    //     const incidence = line()
    //         .x(d => x(d.date))
    //         .y(d => incidenceY(+d.Incident_Rate))

    //     const incidenceAxis = axisLeft(incidenceY).ticks(5)
    //     return [incidence, incidenceAxis, schemeTableau10[3]]
    // }

    // if (name == 'hospitalization') {
    //         const hospitalizationY = scaleLinear()
    //         .domain(extent(v, d => +d.Hospitalization_Rate))
    //         .range(range)

    //     const hospitalization = line()
    //         .x(d => x(d.date))
    //         .y(d => hospitalizationY(+d.Hospitalization_Rate))

    //     const hospitalizationAxis = axisLeft(hospitalizationY).ticks(5)
    //     return [hospitalization, hospitalizationAxis, schemeTableau10[5]]
    // }

    // if (name == 'mortality') {
    //     const mortalityY = scaleLinear()
    //         .domain(extent(v, d => +d.Mortality_Rate))
    //         .range(range)
    
    //     const mortality = line()
    //         .x(d => x(d.date))
    //         .y(d => mortalityY(+d.Mortality_Rate))
    
    //     const mortalityAxis = axisLeft(mortalityY).ticks(5)
    //     return [mortality, mortalityAxis, schemeTableau10[6]]
    // }

    // if (name == 'testing') {
    //     const testingY = scaleLinear()
    //         .domain(extent(v, d => +d.Testing_Rate))
    //         .range(range)

    //     const testing = line()
    //         .x(d => x(d.date))
    //         .y(d => testingY(+d.Testing_Rate))

    //     const testingAxis = axisLeft(testingY).ticks(5)
    //     return [testing, testingAxis, schemeTableau10[7]]
    // }
}
