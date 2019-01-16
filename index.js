import "@babel/polyfill"
import Grapnel from 'grapnel'
import { select } from 'd3'
import styles from './styles.css'

const router = new Grapnel({ pushState: true });

const data = [
    'z','a','b','c'
]

const update = data => {
    const main = select('main')
    let div = main.selectAll('div').data(data, d => d)
    div.enter().append(() => (
        <div className={styles.classy} eventListener={['click', e => {
            console.log(e.target)
        }]}>
        </div>)).merge(div).text(d => d)
    div.exit().remove()
    setTimeout(() => {
        data.sort((a, b) => {
            console.log(a)
            console.log(b)
            return a - b
        })
        console.log(data)
    }, 1000)

}

router.get('/', async req => {
    document.body.appendChild(<main></main>)
    update(data)
})

setTimeout(() => {

}, 500)