import styles from './styles.css'
import Deaths from './deaths'
import ConfirmedCases from './cases'

const title = "COVIZ-19"
const url = "https://scottorly.github.io/coviz19/"
const image = "https://raw.githubusercontent.com/ScottORLY/coviz19/master/screengrab.png"
const description = "Animated time-lapse geographic visualization of US COVID-19 case and death totals by county."

document.head.appendChild(<>
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    <meta name="twitter:card" content="summary_large_image" />  
    <meta property="og:url" content={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image:secure" content={image} />
    <meta property="og:image" content={image} />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
</>)

document.body.appendChild(
    <div id={styles.app}>
        <ConfirmedCases />
        <Deaths />
        <div className={styles.footer}>
            <a href="https://github.com/CSSEGISandData/COVID-19">Novel Coronavirus (COVID-19) Cases data provided by JHU CSSE</a>
        </div>
    </div>

)
