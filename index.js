import Grapnel from 'grapnel'
import styles from './styles.css'
const router = new Grapnel({ pushState: true });

router.get('/', function(req) {
    const div = (
        <>
            <div>
                <h1>Hello World!</h1>
            </div>
        </>
    )
    document.body.appendChild(div)
})