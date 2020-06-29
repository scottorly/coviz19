//Copyright © 2020 Scott Orlyck.

import styles from '../styles.css'
import { select  } from 'd3-selection'
import { scaleSequentialLog } from 'd3-scale'
import { axisBottom } from 'd3-axis'

const ramp = (color) => {
    const n = 320
    const canvas = document.createElement('canvas')
    const context = canvas.getContext("2d")
    canvas.style.width = 320
    canvas.style.height = 44
    for (let i = 0; i < n; ++i) {
      context.fillStyle = color(i / (n - 1))
      context.fillRect(i, 0, 1, 44)
    }
    return canvas;
}

const Legend = ({ attributes: { domain, width, color, label }}) => {
    const legend = select(<svg className={styles.legend} viewBox={[0,0, 320, 44]} />)
    legend.append(() => (
        <image 
            x={0} 
            y={0} 
            width={width} 
            height={44} 
            preserveAspectRatio='none' 
            href={ramp(color).toDataURL()}
        />))

    const x = scaleSequentialLog(color).domain(domain).range([0, width]).nice()
    legend.append(() => <g transform='translate(0, 20)'/>).call(axisBottom(x).ticks(10, ","))
    legend.append(() => <g transform='translate(0, -8)' fill='white' />).append('text').text(label)
    return legend.node()
}

export default Legend
