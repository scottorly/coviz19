# d3activated

"d3-activated"

*tldr - thinking with d3 like it's the new jquery*

The d3activated pattern uses [**d3-selection.join**](https://github.com/d3/d3-selection#selection_join) to bind data to DOM Elements created with [**JSX**](https://reactjs.org/docs/jsx-in-depth.html). The JSX is transpiled using [**jsx-pragma**](https://github.com/ScottORLY/jsx-dom).

d3activated can be used for data visualizations or to bind data to HTML Elements.

[**Demonstration**](https://scottorly.github.io/d3activated)

## Motivation

The most compelling thing about react was not the double buffered, top down, virtual dom diffing library but the discovery of JSX. A discovery comparable to Crockford's discovery of [**JSON**](https://json.org/).

JSX is great but what if you don't want to bootstrap a videogame engine to build a web UI?

[**D3**](https://d3js.org) has been the premier data visualization library for the web since it's release in 2011. The famously verbose syntax can be painful to follow and remains a significant source of frustration for beginners. Meanwhile d3-selection provides a performant method of binding data to dom elements with a small footprint.

d3activated uses  [**jsx-pragma**](https://github.com/ScottORLY/jsx-dom), a simple library used with [**babel**](https://babeljs.io) to transpile JSX to vanilla dom elements instead of react components. These elements can then be used with d3 for binding data to HTML Elements or SVG data visualizations.

## Data Visualization

d3activated can help clean up your d3 code a little.
![](src/resources/d3activated.png)

## Basic Data Binds

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

const data = ['36th Chamber of Shaolin', 'Clan of the White Lotus', 'Sleeping Fist', 'Dance of the Drunken Mantis']

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
