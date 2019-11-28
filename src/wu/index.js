import { select } from 'd3-selection'
import TextInput from '../component'
import Fragment from '../fragment'
import styles from './styles.css'

const id = d => d

const wuSelect = select(
    <main>
        <div id={styles.container}>
            <table>
                <tbody/>
            </table>

            <button eventListener={['click', e => {
                const data = [
                    [0, 1, 4, 3],
                    [1, 3, 2, 3],
                    [1, 3, 2, 3],
                ]
                update(data)
            }]}>update data</button>

            <ul id={styles.user} />

            <button eventListener={['click', e => {
                let user = {
                    username: 'ghostface killer',
                    email: 'ironman@wu.tang'
                }
                updateUser(user)
            }]}>update user</button>

            <div>
                <label>List of Wu Tang artists</label>
                <ul id={styles.list}>
                    <Fragment items={wutangClan} />
                </ul>
            </div>

            <TextInput name='Foo' className={styles.inputContainer}/>
        </div>
    </main>
)

const update = data => {

    const rows = wuSelect.select('tbody').selectAll('tr').data(data)

    const rowsUpdate = rows.join(
        enter => enter.append(() => <tr className={styles.rows} />)
    )

    rowsUpdate.selectAll('td')
        .data(id, id)
        .join(
            enter => enter.append(d => <td>{`${d}`}</td>)
        )
}

const liProps = {
    className: styles.listItem
}

const updateUser = user => {
    wuSelect.select(`#${styles.user}`)
        .selectAll('li').data(Object.values(user), id).join(
            enter => enter.append(d => <li {...liProps}>{d}</li>)
        )
}

const wutangClan = [
    'Inspectah Deck', 'RZA', 'GZA', 'U-God', 'Ghostface Killah', 'Method Man', 'Cappadonna', 'Raekwon'
]

const wu = wuSelect.node()

update([
    [0, 1, 2, 3],
    [0, 1, 2, 3]
])

updateUser({
    username: 'ghostface killer',
    email: 'tstark@wu.tang'
})

export { wu as default, update, updateUser }