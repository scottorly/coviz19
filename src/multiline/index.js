import styles from './styles.css'
import file from './unemployment.js'

import { select, event } from 'd3-selection'
import { line } from 'd3-shape'
import { axisLeft, axisBottom } from 'd3-axis'
import { scaleUtc, scaleLinear } from 'd3-scale'
import { tsvParse } from 'd3-dsv'
import { max, extent, bisectLeft } from 'd3-array'
import { utcParse } from 'd3-time-format'

const margin = { top: 20, right: 20, bottom: 30, left: 30 }

const width = 800
const height = 400
const viewBox = [0, 0, width, height]
const svgProps = { width, height, viewBox }

const svg = select(<svg {...svgProps} />)

const unemployment = tsvParse(file, (d, i, columns) => ({
    name: d.name.replace(/, ([\w-]+).*/, " $1"),
    values: columns.slice(1).map(k => +d[k])
}))

const data = {
    series: unemployment,
    dates: unemployment.columns.slice(1).map(utcParse("%Y-%m"))
}

const multiLine = line()
    .defined(d => !isNaN(d))
    .x((d, i) => x(data.dates[i]))
    .y(d => y(d))

const y = scaleLinear()
    .domain([0, max(data.series, d => max(d.values))])
    .nice()
    .range([height - margin.bottom, margin.top])

const x = scaleUtc()
    .domain(extent(data.dates))
    .range([margin.left, width - margin.right])

const yGroup = () => <g transform={`translate(${margin.left},0)`} />
const xGroup = () => <g transform={`translate(0,${height - margin.bottom})`} />

const lineGroup = () => (
    <g
        fill='none'
        stroke='steelblue'
        stroke-linejoin='round'
        stroke-linecap='round'
    />
)

svg.append(yGroup).call(axisLeft(y))
svg.append(xGroup).call(axisBottom(x).ticks(width / 80).tickSizeOuter(0))

const path = svg.append(lineGroup).selectAll('path').data(data.series).join(
    enter => enter.append(d => <path className={styles.path} d={multiLine(d.values)} />)
)

const dot = svg.append(() => <g display='none' />)
dot.append(() => <circle r={2.5} />)
dot.append(() => <text text-anchor='middle' y={-8} />)

const svgNode = svg.node()
const pt = svgNode.createSVGPoint()

const cursorPoint = (pt, evt) => {
    pt.x = evt.clientX
    pt.y = evt.clientY
    return pt.matrixTransform(svgNode.getScreenCTM().inverse())
}

const moved = (path, dot) => () => {
    event.preventDefault()
    const cursor = cursorPoint(pt, event)
    const ym = y.invert(cursor.y)
    const xm = x.invert(cursor.x)
    const i1 = bisectLeft(data.dates, xm, 1)
    const i0 = i1 - 1
    const i = xm - data.dates[i0] > data.dates[i1] - xm ? i1 : i0
    const s = data.series.reduce((a, b) => Math.abs(a.values[i] - ym) < Math.abs(b.values[i] - ym) ? a : b)
    path.attr("stroke", d => d === s ? null : "#ddd").filter(d => d === s).raise()
    dot.attr("transform", `translate(${x(data.dates[i])},${y(s.values[i])})`)
    dot.select("text").text(s.name)
}

const entered = (path, dot) => () => {
    path.style("mix-blend-mode", null).attr("stroke", "#ddd")
    dot.attr("display", null)
}

const left = (path, dot) => () => {
    path.style("mix-blend-mode", "multiply").attr("stroke", null)
    dot.attr("display", "none")
}

svg.on('mousemove', moved(path, dot))
svg.on('mouseenter', entered(path, dot))
svg.on('mouseleave', left(path, dot))

export default svgNode