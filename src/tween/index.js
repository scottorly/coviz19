//Copyright © 2020 Scott Orlyck.

import { interpolateNumber } from 'd3-interpolate'
import { format  } from 'd3-format'

const formatNumber = format(',d')
const textTween = (a, b) => {
    const i = interpolateNumber(parseInt(a), parseInt(b))
    return function(t) {
        this.textContent = formatNumber(i(t))
    }
}

export default textTween