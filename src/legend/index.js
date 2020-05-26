//Copyright © 2020 Scott Orlyck.

import styles from './styles.css'
import { select  } from 'd3-selection'
import { axisBottom } from 'd3-axis'


const Legend = ({ attributes: { domain, width, scale, color, label }}) => {

    const colorScale = scale(color).domain(domain)
    const points = colorScale.ticks(width)
    const ramp = () => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext("2d")
        canvas.style.width = width
        canvas.style.height = 44
        canvas.style.imageRendering = "pixelated";
        for (let i = 0; i < points.length; ++i) {
            const fill = colorScale(points[i])
            context.fillStyle = fill;
            context.fillRect(i, 0, 1, 44);
          }
        return canvas;
    }

    const legend = select(<svg className={styles.legend} width={320} height={44}/>)
    legend.append(() => (
        <image 
            x={0} 
            y={0} 
            width={width} 
            height={44} 
            preserveAspectRatio='none' 
            href={ramp().toDataURL()}
        />))

    const x = scale(color).domain(domain).range([0, width]).nice()
    legend.append(() => <g transform='translate(0, 20)'/>).call(axisBottom(x).ticks(5, ","))
    legend.append(() => <g transform='translate(0, -8)' />).append('text').text(label)
    return legend.node()
}

export default Legend