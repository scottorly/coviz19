//Copyright © 2020 Scott Orlyck.

import 'd3-selection'
import { geoPath } from 'd3-geo'

const path = geoPath()

const StatePath = ({ attributes: { d, eventListeners }}) => (
    <path 
        stroke='#ccc' 
        stroke-width={1} 
        stroke-linejoin='round'
        vector-effect='non-scaling-stroke'
        fill='none' 
        d={path(d)} 
        eventListeners={eventListeners}
    />
)

const FeaturePath = ({ attributes: { d, eventListeners }}) => (
    <path
        stroke-width={0}
        shape-rendering="crispEdges"
        fill={d.fill || ''}
        d={path(d.feature) || ''}
        eventListeners={eventListeners}
    />
)

export { StatePath, FeaturePath }