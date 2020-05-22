import styles from './styles.css'
import Deaths from './deaths'
import ConfirmedCases from './cases'

document.head.appendChild(<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />)

document.body.appendChild(
    <div id={styles.app}>
        <ConfirmedCases />
        <Deaths />
        <div className={styles.footer}>
            <a href="https://github.com/CSSEGISandData/COVID-19">Novel Coronavirus (COVID-19) Cases data provided by JHU CSSE</a>
        </div>
    </div>

)
