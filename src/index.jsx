//Copyright © 2020 Scott Orlyck.

import styles from './styles.module.css'
import StatesDaily from './daily/index'
import Choropleth from './choropleth'
import Footer from './footer'

document.body.appendChild(
    <div id={styles.app}>
        <Choropleth />
        <StatesDaily />
        <Footer />
    </div>
)
