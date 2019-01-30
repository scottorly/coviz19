import "@babel/polyfill"
import Grapnel from 'grapnel'
import { select } from 'd3'
import styles from './styles.css'

const router = new Grapnel({ pushState: true });

let numbers = [    
    ["c","a", "z", "b"],
    ["n","w", "d", "b"],
    ["a","a", "z", "i"],
    ["x","b", "e", "m"],
]

const update = data => {    
    const main = select('main')
    const table = main.select('tbody')
    
    const t = table.transition().duration(750)

    const rows = table.selectAll('tr').data(data, d => d)
    const rowsUpdate = rows.join(
        enter => enter.append(() => <tr className={styles.rows} />),
        update => update,
        exit => exit.remove()
    )
    
    rowsUpdate.selectAll('td').data(d => d).join(
        enter => enter.append(d => <td>{`${d}`}</td>),
        update => update,
        exit => exit.remove()
    )
}

const sort = i => {
    numbers.sort((a,b) => {
        return a[i] > b[i]
    })
    update(numbers)
}

router.get('/', async req => {
    document.body.appendChild(
        <main>
            <table>
                <thead>
                    <tr>
                        <th eventListener={['click', e => {
                            sort(0)
                        }]}>
                        0
                        </th>
                        <th eventListener={['click', e => {
                            sort(1)
                        }]}>
                        1
                        </th>
                        <th eventListener={['click', e => {
                            sort(2)
                        }]}>
                        2
                        </th>
                        <th eventListener={['click', e => {
                            sort(3)
                        }]}>
                        3
                        </th>

                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </main>
    )
    update(numbers)
})

