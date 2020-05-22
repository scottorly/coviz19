import styles from './styles.css'
import { select  } from 'd3-selection'
import {  scaleSequential } from 'd3-scale'
import { axisBottom } from 'd3-axis'

const ramp = (color) => {
    const n = 320
    const canvas = document.createElement('canvas')
    const context = canvas.getContext("2d");
    canvas.style.width = 320;
    canvas.style.height = 44
    canvas.style.imageRendering = "-moz-crisp-edges";
    canvas.style.imageRendering = "pixelated";
    for (let i = 0; i < n; ++i) {
      context.fillStyle = color(i / (n - 1));
      context.fillRect(i, 0, 1, 44);
    }
    return canvas;
}

const Legend = ({ attributes: { domain, width, color }}) => {
    const legend = select(<svg className={styles.legend} width={320} height={44}/>)
    legend.append(() => (
        <image 
            x={0} 
            y={0} 
            width={width} 
            height={44} 
            preserveAspectRatio='none' 
            href={ramp(color).toDataURL()}
        />))
    const x = scaleSequential().domain(domain).range([0, width])
    legend.append(() => <g transform='translate(0, 20)'/>).call(axisBottom(x).ticks())
    return legend.node()
}

export default Legend