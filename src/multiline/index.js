import styles from './styles.css'
import file from './unemployment.js'

import { select, namespaces, event } from 'd3-selection'
import { line } from 'd3-shape'
import { axisLeft, axisBottom } from 'd3-axis'
import { scaleUtc, scaleLinear } from 'd3-scale'
import { tsvParse } from 'd3-dsv'
import { max, extent, bisectLeft } from 'd3-array'
import { utcParse } from 'd3-time-format'

const ns = { xmlns: namespaces.svg }

const margin = { top: 20, right: 20, bottom: 30, left: 30 }

const width = 800
const height = 400
const viewBox = [0, 0, width, height]
const svgProps = {...ns, width, height, viewBox }

const svg = select(<svg {...svgProps} />)

const unemployment = tsvParse(file, (d, i, columns) => ({
    name: d.name.replace(/, ([\w-]+).*/, " $1"),
    values: columns.slice(1).map(k => +d[k])
}))

const data = {
    series: unemployment,
    dates: unemployment.columns.slice(1).map(utcParse("%Y-%m"))
}

const multLine = line().defined(d => !isNaN(d)).x((d, i) => x(data.dates[i])).y(d => y(d))
const y = scaleLinear().domain([0, max(data.series, d => max(d.values))]).nice().range([height - margin.bottom, margin.top])
const x = scaleUtc().domain(extent(data.dates)).range([margin.left, width - margin.right])

const yGroup = () => <g {...ns} transform={`translate(${margin.left},0)`} />
const xGroup = () => <g {...ns} transform={`translate(0,${height - margin.bottom})`} />

const lineProps = {
    ...ns,
    fill: 'none',
    stroke: 'steelblue',
    'stroke-linejoin': 'round',
    'stroke-linecap': 'round'
}

const lineGroup = () => <g {...lineProps} />

svg.append(yGroup).call(axisLeft(y))
svg.append(xGroup).call(axisBottom(x).ticks(width / 80).tickSizeOuter(0))

const path = svg.append(lineGroup).selectAll('path').data(data.series).join(
    enter => enter.append(d => (
        <path
            {...ns}
            className={styles.path}
            d={multLine(d.values)}
        />
    ))
)

const dot = svg.append(() => <g {...ns} display='none' />)
dot.append(() => <circle {...ns} r={2.5} />)
dot.append(() => <text {...ns} text-anchor='middle' y={-8} />)

const moved = () => {
    event.preventDefault();
    const ym = y.invert(event.layerY);
    const xm = x.invert(event.layerX);
    const i1 = bisectLeft(data.dates, xm, 1);
    const i0 = i1 - 1;
    const i = xm - data.dates[i0] > data.dates[i1] - xm ? i1 : i0;
    const s = data.series.reduce((a, b) => Math.abs(a.values[i] - ym) < Math.abs(b.values[i] - ym) ? a : b);
    path.attr("stroke", d => d === s ? null : "#ddd").filter(d => d === s).raise();
    dot.attr("transform", `translate(${x(data.dates[i])},${y(s.values[i])})`);
    dot.select("text").text(s.name);
}

const entered = () => {
    path.style("mix-blend-mode", null).attr("stroke", "#ddd");
    dot.attr("display", null);
}

const left = () => {
    path.style("mix-blend-mode", "multiply").attr("stroke", null);
    dot.attr("display", "none");
}

svg.on('mousemove', moved)
svg.on('mouseenter', entered)
svg.on('mouseleave', left)

export default svg.node()