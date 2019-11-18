# d3act.js

d3act.js is a pattern combining d3 & JSX that can be used to render d3 data visualizations or as a JS browser application framework.

d3act.js uses d3-selection's [join](https://github.com/d3/d3-selection#joining-data) API to bind data to DOM Elements created with the [React.createElement](https://reactjs.org/docs/react-api.html#createelement) API (JSX) transpiled using [JSX-Pragma](https://github.com/ScottORLY/jsx-dom).

## Basic usage

```
import { select, selectAll } from 'd3-selection'
import styles from './styles.css'

const ul = (<ul id={styles.list}/>)

const update = data => {
    select(`#${styles.list}`)
        .selectAll('li')
        .data(data, d => d)
        .join(
            enter => enter.append(d => <li className={styles.listItem}>{d}</li>)
        )
}

document.body.appendChild(ul)

const data = ['36th Chamber of Shaolin', 'Clan of the White Lotus', 'Sleeping Kung Fu', 'Dance of the Drunken Mantis']

update(data)
```

## Setup

install

`npm i`

start dev server

`npm start`

build

`npm run dist`
