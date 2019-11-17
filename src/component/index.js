import styles from './styles.css'
import { select } from 'd3-selection'

const TextInput = ({ attributes: { name, className }}) => (
    <div className={className} >
        <label>{name}</label>
        <input id={styles.textInput} type='text'/>
        <button eventListener={['click', async e => {
            const message = select(`#${styles.textInput}`).node().value
            window.alert(message)
        }]}>{`${name}`}</button>
    </div>
)

export default TextInput