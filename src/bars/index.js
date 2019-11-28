import styles from './styles.css'
import brands from './brands.js'

import { select } from 'd3-selection'
import { csvParse, autoType } from 'd3-dsv'
import { rollup, descending, ascending, pairs, groups, range } from 'd3-array'
import { schemeTableau10 } from 'd3-scale-chromatic'
import { format  } from 'd3-format'
import { utcFormat } from 'd3-time-format'
import { interpolateNumber } from 'd3-interpolate'
import { axisTop } from 'd3-axis'
import { scaleOrdinal, scaleLinear, scaleBand } from 'd3-scale'
import 'd3-transition'
import { easeLinear } from 'd3-ease'

const margin = { top: 20, right: 20, bottom: 30, left: 30 }
const barSize = 48
const n = 12
let k = 10
const duration = 250
const height = margin.top + barSize * n + margin.bottom
const width = 800

const viewBox = [0, 0, width, height]
const svgProps = { width, height, viewBox }

const formatNumber = format(",d")
const formatDate = utcFormat("%Y")

const data = csvParse(brands, autoType)
const names = new Set(data.map(d => d.name))

const datevalues = [...rollup(data, ([d]) => d.value, d => +d.date, d => d.name)]
    .map(([date, data]) => [new Date(date), data])
    .sort(([a], [b]) => ascending(a, b))

const rank = value => {
    const data = [...names].map(name => ({ name, value: value(name) || 0 }))
    data.sort((a, b) => descending(a.value, b.value))
    for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(n, i)
    return data
}

const keyframes = []
let ka, a, kb, b
for ([[ka, a], [kb, b]] of pairs(datevalues)) {
    for (let i = 0; i < k; ++i) {
        const t = i / k
        keyframes.push([
            new Date(ka * (1 - t) + kb * t),
            rank(name => a.get(name) * (1 - t) + b.get(name) * t)
        ])
    }
}
keyframes.push([new Date(kb), rank(name => b.get(name))])

const nameframes = groups(keyframes.flatMap(([, data]) => data), d => d.name)
const prev = new Map(nameframes.flatMap(([, data]) => pairs(data, (a, b) => [b, a])))
const next = new Map(nameframes.flatMap(([, data]) => pairs(data)))

const color = (d) => {
    const scale = scaleOrdinal(schemeTableau10)
    if (data.some(d => d.category !== undefined)) {
        const categoryByName = new Map(data.map(d => [d.name, d.category]))
        scale.domain([...categoryByName.values()])
        return scale(categoryByName.get(d.name))
    }
    return scale(d.name)
}
const textTween = (a, b) => {
    const i = interpolateNumber(a, b)
    return function(t) {
        this.textContent = formatNumber(i(t))
    }
}

const x = scaleLinear([0, 1], [margin.left, width - margin.right])
const y = scaleBand()
    .domain(range(n + 1))
    .rangeRound([margin.top, margin.top + barSize * (n + 1 + 0.1)])
    .padding(0.1)

const bars = svg => {
    let bar = svg.append(() => <g fill-opacity='0.6' />).selectAll('rect')
    return ([, data], transition) => bar = bar
        .data(data.slice(0, n), d => d.name)
        .join(
            enter => enter.append(d => (
                <rect
                    fill={`${color(d)}`}
                    height={y.bandwidth()}
                    x={x(0)}
                    y={y((prev.get(d) || d).rank)}
                    width={x((prev.get(d) || d).value) - x(0)}
                />
            ),
            update => update,
            exit => exit.transition(transition).remove()
                .attr('y', d => y((next.get(d) || d).rank))
                .attr('width', d => x((next.get(d) || d).value) - x(0))
            )
        )
        .call(bar => bar
            .transition(transition)
            .attr('y', d => y(d.rank))
            .attr('width', d => x(d.value) - x(0))
        )
}

const labels = svg => {
    let label = svg.append(() => <g className={styles.label} text-anchor='end' />).selectAll('text')
    return ([, data], transition) => label = label
        .data(data.slice(0, n), d => d.name)
        .join(
            enter => enter.append(d => (
                <text
                    transform={`translate(${x((prev.get(d) || d).value)},${y((prev.get(d) || d).rank)})`}
                    x={-6}
                    y={y.bandwidth() / 2}
                    dy='-0.25em'
                >
                    {d.name}
                    <tspan
                        fill-opacity={0.7}
                        font-weight='normal'
                        x={-6}
                        dy='1.15em'
                    />
                </text>
            ),
            update => update,
            exit => exit.transition(transition).remove()
                .attr("transform", d => `translate(${x((next.get(d) || d).value)},${y((next.get(d) || d).rank)})`)
                .call(g => g.select("tspan").tween("text", d => textTween(d.value, (next.get(d) || d).value)))
            )
        )
        .call(bar => bar
            .transition(transition)
            .attr("transform", d => `translate(${x(d.value)},${y(d.rank)})`)
            .call(g => g.select("tspan").tween("text", d => textTween((prev.get(d) || d).value, d.value))))
}

const axis = (svg) => {
    const g = svg.append(() => <g transform={`translate(0,${margin.top})`}/>)

    const axis = axisTop(x)
        .ticks(width / 160)
        .tickSizeOuter(0)
        .tickSizeInner(-barSize * (n + y.padding()))

      return (_, transition) => {
        g.transition(transition).call(axis)
        g.select(".tick:first-of-type text").remove()
        g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "white")
        g.select(".domain").remove()
      }
}

const ticker = svg => {
    const now = svg.append(() => (
        <text
            className={styles.ticker}
            text-anchor='end'
            x={width - 6}
            y={margin.top + barSize * (n - 0.45)}>
            {formatDate(keyframes[0][0])}
        </text>
    ))
    return ([date], transition) => {
        transition.end().then(() => now.text(formatDate(date)))
    }
}

const svg = select(<svg {...svgProps} />)

const updateBars = bars(svg)
const updateAxis = axis(svg)
const updateLabels = labels(svg)
const updateTicker = ticker(svg)

const start = async () => {
    for (const keyframe of keyframes) {
        const transition = svg.transition()
            .duration(duration)
            .ease(easeLinear)

        x.domain([0, keyframe[1][0].value])

        updateAxis(keyframe, transition)
        updateBars(keyframe, transition)
        updateLabels(keyframe, transition)
        updateTicker(keyframe, transition)
        await transition.end()
    }
}

const node = svg.node()
export { node as default , start }
