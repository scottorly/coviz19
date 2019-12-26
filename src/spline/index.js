import { select } from 'd3-selection'
import { curveBasis, line } from 'd3-shape'
import { range } from 'd3-array'
import { randomNormal } from 'd3-random'
import { axisBottom, axisLeft } from 'd3-axis'
import { scaleLinear } from 'd3-scale'
import { easeLinear } from 'd3-ease'
import { active } from 'd3-transition'

const n = 40
const random = randomNormal(0, .2)
const data = range(n).map(random)

const margin = {top: 20, right: 20, bottom: 20, left: 40}
const width = 400 - margin.left - margin.right
const height = 600 - margin.top - margin.bottom
const svg = select(<svg width={width} height={height} />)

const g = svg.append(() => <g transform={`translate(${margin.left}, ${margin.top})`}/>)

const x = scaleLinear()
    .domain([1, n - 2])
    .range([0, width]);

const y = scaleLinear()
    .domain([-1, 1])
    .range([height, 0]);

const pathLine = line()
    .curve(curveBasis)
    .x(function(d, i) { return x(i); })
    .y(function(d, i) { return y(d); });

g.append(() => (
    <defs>
        <clipPath id='clip'>
            <rect width={width} height={height}/>
        </clipPath>
    </defs>
))

g.append(() => <g className='axis--x' transform={`translate(0, ${y(0)})`}/>)
.call(axisBottom(x))

g.append(() => <g className='axis--y'/>)
.call(axisLeft(y))

g.append(() => <g clip-path='url(#clip)'/>)
    .append(() => <path className='line' fill='none' stroke='#000' stroke-width='1.5px'/>)
    .datum(data)
    .transition()
    .duration(500)
    .ease(easeLinear)
    .on('start', tick)

function tick() {

  // Push a new data point onto the back.
  data.push(random())

  // Redraw the line.
  select(this)
      .attr("d", pathLine)
      .attr("transform", null)

  // Slide it to the left.
  active(this)
      .attr("transform", `translate(${x(0)}, 0)`)
    .transition()
      .on("start", tick)

  // Pop the old data point off the front.
  data.shift()
}

const node = svg.node()

export default node
