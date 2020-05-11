import styles from './styles.css'
import { select, selectAll } from 'd3-selection'

const fields = [
    ['first', ''],
    ['last', ''],
    ['email', ''],
    ['phone', ''],
    ['organization', ''],
]

const user = new Map([...fields])

const update = (data) => {
    const info = select(`#${styles.info}`)
    info.selectAll('p')
    .data([...data], d => {
        if (d == undefined) {
            return d
        }
        return d[0]
    })
    .join(
        enter => enter.append(d => <p>{`${d[0]} ${d[1]}`}</p>),
        update => update.text(d => `${d[0]} ${d[1]}`)
    )
}

window.addEventListener('pageshow', () => update(user))

const Input = ({ attributes: { name }}) => (
    <input
        className={styles.input}
        type='text'
        eventListener={['input', e => {
            user.set(name, e.target.value)
            update(user)
        }]}
    />
)

const User = () => (
    <div id={styles.user}>
        <h1>Form Data Binding Example</h1>
        <form id={styles.form}>
            <label className={styles.label}>First</label>
            <Input name='first'/>
            <label className={styles.label}>Last</label>
            <Input name='last'/>
            <label className={styles.label}>Email</label>
            <Input name='email'/>
            <label className={styles.label}>Phone</label>
            <Input name='phone'/>
            <label className={styles.label}>Organization</label>
            <Input name='organization'/>
        </form>
        <div id={styles.info}>
            <p/>
        </div>
        <a href="https://github.com/ScottORLY/d3activated/blob/master/src/form/index.js">source</a>
    </div>
)

export default User