import "core-js/stable";
import "regenerator-runtime/runtime";

import Grapnel from 'grapnel'
import { select, selectAll } from 'd3-selection'
import styles from './styles.css'

const router = new Grapnel({ pushState: true });

const Counter = () => {
    let count = 0
    const element = <p>{`${count}`}</p>
    return (
        <div>
            <button eventListener={['click', e => {
                select(element).text(`${++count}`)
            }]}>+</button>
            { element }
            <button eventListener={['click', e => {
                select(element).text(`${--count}`)
            }]}>-</button>
        </div>
    )
}

let user = {
    username: 'ghostface killer',
    email: 'tony@wu.tang'
}

let counters = [
   [0, 1, 2, 3],
   [0, 1, 2, 3]
]

const id = d => d

const update = data => {
    const table = select('tbody')
    const rows = table.selectAll('tr').data(data)

    const rowsUpdate = rows.join(
        enter => enter.append(() => <tr className={styles.rows} />),
        update => update,
        exit => exit.remove()
    ).order()

    rowsUpdate.selectAll('td').data(id, id).join(
        enter => enter.append(d => <td>{`${d}`}</td>),
        update => update,
        exit => exit.remove()
    )

    const userList = select(`#${styles.user}`)

    userList.selectAll('li').data(Object.values(user), id).join(
        enter => enter.append(d => <li>{d}</li>)
        // update => update,
        // exit => exit.remove()
    )
}

router.get('/', async req => {
    document.body.appendChild(
        <main>
            <table>
                <thead>
                    <tr>
                        <th eventListener={['click', e => {

                        }]}>
                        0
                        </th>
                        <th eventListener={['click', e => {

                        }]}>
                        1
                        </th>
                        <th eventListener={['click', e => {

                        }]}>
                        2
                        </th>
                        <th eventListener={['click', e => {

                        }]}>
                        3
                        </th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <button eventListener={['click', e => {
                const data = [
                    [0, 1, 4, 3],
                    [1, 3, 2, 3],
                    [1, 3, 2, 3],
                 ]
                 user.email = 'please@change'
                update(data)
            }]}>update</button>

            <ul id={styles.user}>

            </ul>
            <Counter />
        </main>
    )
    update(counters)
})

