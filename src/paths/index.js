//Copyright © 2020 Scott Orlyck.

import 'd3-selection'
import { geoPath } from 'd3-geo'

const path = geoPath()

const StatePath = ({ attributes: { d }}) => (
    <path stroke='#ccc' stroke-linejoin='round' fill='none' d={path(d)}/>
)

const FeaturePath = ({ attributes: { d, nameLabel, fill, cursorPoint }}) => (
    <path 
        stroke='#ccc' 
        stroke-linejoin='round' 
        fill={fill}
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
        ]}
    />
)

export { StatePath, FeaturePath }