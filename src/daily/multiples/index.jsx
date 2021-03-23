import styles from '../styles.module.css'
import { select } from 'd3-selection'
import { timeParse } from 'd3-time-format'
import { extent } from 'd3-array'
import { scaleUtc, scaleBand } from 'd3-scale'
import { axisBottom } from 'd3-axis'
import { timeDay } from 'd3-time'
import { ys } from './ys'

const domain = [
    'confirmed',
    'deaths',
    'active',
    'recovered',
    'incidence',
    'hospitalization',
    'mortality',
    'testing'
]

const margin = { top: 20, right: 30, bottom: 20, left: 60}
const width = 640
const height = 460
const svgWidth = 700
const svgHeight = 800
const vizHeight = svgHeight - margin.bottom - margin.top

const parseDate = timeParse('%m-%d-%Y')
const fourTwelve = parseDate('4-12-2020')

const now = new Date()
const dates = timeDay.range(fourTwelve, now)
const row = scaleBand()
    .domain(domain)
    .range([0, 760])
    .paddingInner(0.25)

const bandwidth = row.bandwidth()
const range = [bandwidth, 0]

const x = scaleUtc()
        .domain(extent(dates))
        .range([0, width])
    
const xAxis = axisBottom(x).ticks(5)

const MultipleGraph = ({ attributes: { d, row, graph }}) => {

    const [xLine, xAxis, color] = ys(graph, d, range, x)

    const g = select(<g transform={`translate(0, ${row})`} />)

    g.append(() => <g className={styles.axis}/>)
        .call(xAxis)
        .call(g => g.selectAll('.domain').remove())
        .append(() => (
            <text 
                x='90%' 
                y={-4} 
                text-anchor='right' 
                fill={color} 
                font-size={16}
            >
                {graph}
            </text> 
        ))

    g.append(() => <g fill={color} />)
    g.append(() => 
        <path 
            d={xLine(d)}    
            fill='none' 
            stroke={color}
            stroke-width={2.0}
            stroke-linejoin='round' 
        />)

    return g.node()
}

const Multiple = ({ attributes: { d: [state, v] }}) => {

    const props = { viewBox: [0, 0, 700, 800], className: styles.multiples }
    const svg = select(<svg {...props}/>)

    const g  = svg.append(() => 
        <g transform={`translate(${margin.left}, ${margin.top})`}/>
    )

    g.selectAll('g')
        .data(domain, d => d)
        .join(enter => enter.append(d => 
                <MultipleGraph d={v} row={row(d)} graph={d} />
            ))
    
    g.append(() => <g transform={`translate(0, ${vizHeight})`} className={styles.axis}/>)
        .call(xAxis)
        .call(g => g.selectAll('.domain').remove())

    return (
        <div id={state}>
            <p className={styles.stateLabel}>{ state }</p>
            { svg.node() }
        </div>
    )
}

export default Multiple