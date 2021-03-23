//Copyright © 2020 Scott Orlyck.

import styles from './styles.module.css'

const git = 'https://github.com/ScottORLY/coviz19'
const jhu = 'https://github.com/CSSEGISandData/COVID-19'
const census = 'https://api.census.gov/data/2018/pep/population?get=POP&for=county'

const Footer = () => (
    <div className={styles.footer}>
        <p>created by <a href={git}>Scott Orlyck</a></p>
        <h4>Data:</h4>
        <p>
            <a href={jhu}>
                COVID-19 Data Repository by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University
            </a>
        </p>
        <p>
            <a href={census}>US Census</a>
        </p>
    </div>
)

export default Footer