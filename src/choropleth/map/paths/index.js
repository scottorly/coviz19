//Copyright © 2020 Scott Orlyck.

import 'd3-selection'
import { geoPath } from 'd3-geo'

const path = geoPath()

const StatePath = ({ attributes: { d, eventListeners }}) => (
    <path 
        className='states'
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
        className={'counties'}
        vector-effect='non-scaling-stroke'
        stroke='none'
        fill={d.fill || ''}
        d={path(d.feature) || ''}
        eventListeners={eventListeners}
    />
)

export { StatePath, FeaturePath }