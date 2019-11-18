# d3activated

*pronounced "d3-activated"

The d3activated pattern uses [d3-selection.join](https://github.com/d3/d3-selection#joining-data) to bind data to DOM Elements created with [JSX](https://reactjs.org/docs/react-api.html#createelement). The JSX is transpiled using [JSX-Pragma](https://github.com/ScottORLY/jsx-dom).

D3activated can be used for d3 data visualizations or as the basis for a UI application library or framework.

## Basic usage

```javascript
import { select, selectAll } from 'd3-selection'
import styles from './styles.css'

const ul = (<ul />)

const update = data => {
    select('ul')
        .selectAll('li')
        .data(data, d => d)
        .join(
            enter => enter.append(d => <li>{d}</li>)
        )
}

document.body.appendChild(ul)

const data = ['36th Chamber of Shaolin', 'Clan of the White Lotus', 'Sleeping Kung Fu', 'Dance of the Drunken Mantis']

update(data)
```

To update the bound data simply call the update function again with the updated data.

```javascript
data.unshift('Shaolin Executioner')
data.pop()

update(data)
```

## Setup

install

`npm i`

start dev server

`npm start`

build

`npm run dist`
