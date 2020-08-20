//Copyright © 2020 Scott Orlyck.

import styles from './styles.css'
import Choropleth from './choropleth'
// import StatesDaily from './daily'
import Footer from './footer'

mixpanel.track("Page View")

document.body.appendChild(
    <div id={styles.app}>
        <Choropleth />
        {/* <StatesDaily /> */}
        <Footer />
    </div>
)
