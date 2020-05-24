//Copyright © 2020 Scott Orlyck.

import styles from './styles.css'
import Legend from '../legend'
import textTween from '../tween'
import { csvParse } from 'd3-dsv'
import { geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import { select , selectAll } from 'd3-selection'
import { timeParse } from 'd3-time-format'
import { scaleSequentialLog } from 'd3-scale'
import 'd3-transition'
import { group, sum } from 'd3-array'
import { interpolateBlues } from 'd3-scale-chromatic'

const width = 975
const height = 610
const domain = [1, 100000]
const parseDate = timeParse("%m/%d/%y")

const casesSvg = select(<svg viewBox={[0, 0, width, height]} width={width} height={height}/>)

const cases = async () => {
    const counties = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json')
    const cases = await fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv')

    const us = await counties.json()
    const covidCases = await cases.text()

    const casesData = csvParse(covidCases).filter(d => d.UID.slice(3).length > 0)

    const features = feature(us, us.objects.counties).features
    const states = feature(us, us.objects.states).features
    const featuresById = group(features, feature => feature.id)

    const sample = casesData[0]
    const dates = Object.keys(sample).filter(parseDate).sort((a, b) => parseDate(a) > parseDate(b))

    const casesMapped = dates.map(key => {
        return [key, casesData.map(d => {
            const id = d.UID.slice(3)
            const feature = (featuresById.get(id) || [])[0] || { properties: {}}
            const county = feature.properties.name || ''
            const cases = d[key]
            const state = d.Province_State
            const label = `${county} County, ${state}`
            return {
                id,
                cases,
                feature,
                label,
                state
            }
        })]
    })

    const totals = casesMapped.map(d => sum(d[1], d => d.cases))

    const getCasesDay = counter => {
        const pair = casesMapped[counter]
        const date = parseDate(pair[0]).toLocaleDateString()

        selectAll(`.${styles.totalLabel}`)
            .transition('text.tween')
            .tween('text', () => textTween(totals[counter-1] || 0, totals[counter]))

        selectAll(`.${styles.dateLabel}`)
            .text(date)
        return pair[1].filter(d => d.cases > 0)
    }

    const casesColor = scaleSequentialLog(interpolateBlues).domain(domain)
    
    const path = geoPath()
    casesSvg.append(() => <g />)
        .selectAll('path')
        .data(states)
        .join(
            enter => enter.append(d => <path stroke='#ccc' stroke-linejoin='round' fill='none' d={path(d)} eventListener={['mousemove', e => {
                
            }]}/>)
        )
      
    const casesGroup = casesSvg.append(() => <g />)

   // Create an SVGPoint
   const svgNode = casesSvg.node()
   const pt = svgNode.createSVGPoint()

   // Get point in global SVG space
   const cursorPoint = (evt) => {
       pt.x = evt.clientX
       pt.y = event.clientY
       return pt.matrixTransform(svgNode.getScreenCTM().inverse())
   }
    const nameLabel = casesSvg.append(() => <g/>).append(() => <text y={20}/>)

    const updateCases = (data) => {
        casesGroup
        .selectAll('path')
        .data(data, d => d.id)
        .join(
            enter => enter.append(d => <path 
                stroke='#ccc' 
                stroke-linejoin='round' 
                fill={casesColor(d.cases)} 
                d={path(d.feature)}
                eventListeners={[
                    ['mousemove', e => {
                        const point = cursorPoint(e)
                        nameLabel
                            .style('opacity', 1)
                            .attr('transform', `translate(${point.x + 12}, ${point.y})`)
                            .text(d.label)
                    }],
                    ['mouseout', e => {
                        nameLabel
                            .style('opacity', 0)
                            .text('')
                    }]
                ]}/>)
                .call(enter => enter.style('opacity', 0).transition(250).style('opacity', 1)),
            update => update.call(update => update.transition(250).style('fill', d => casesColor(d.cases))),
            exit => exit.call(exit => exit.transition(250).style('opacity', 0).remove())
        )
    }

    var counter = 0
    let interval
    interval = setInterval(() => {
        if (counter >= casesMapped.length) {
            clearInterval(interval)
            return
        }
        const casesDay = getCasesDay(counter)
        updateCases(casesDay)
        counter++
    }, 250)
}

cases()

const ConfirmedCases = () => (<>
    <h1>US Confirmed COVID-19 Cases</h1>
    <h1 className={styles.dateLabel} />
    <h1 className={styles.totalLabel} />
    { casesSvg.node() }
    <Legend domain={domain} width={320} color={interpolateBlues} />
    <a href="https://github.com/ScottORLY/coviz19/blob/master/src/cases/index.js">source code</a>
</>)

export default ConfirmedCases