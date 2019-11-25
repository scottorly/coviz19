# d3activated

![](src/resources/d3activated.png)

"d3-activated"

The d3activated pattern uses [d3-selection.join](https://github.com/d3/d3-selection#selection_join) to bind data to DOM Elements created with [JSX](https://reactjs.org/docs/react-api.html#createelement). The JSX is transpiled using [jsx-pragma](https://github.com/ScottORLY/jsx-dom).

D3activated can be used for d3 data visualizations or as the basis for a UI application library or framework.

[Demo](https://scottorly.github.io/d3activated)

## Basic usage

```javascript
import { select } from 'd3-selection'

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

For more about d3's general update pattern see https://observablehq.com/@d3/selection-join & [Thinking with Joins](https://bost.ocks.org/mike/join/).

## Setup

install

`npm i`

start dev server

`npm start`

build

`npm run dist`
