// create base map layers
const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
})

// create overlay layer from data
import data from './data/circuit.json' assert {type: 'json'}

const formulaOneCircuits = L.layerGroup(data.map(
  item => L.marker([item.lat, item.lng]).bindTooltip(
    `<div>
      <h2>${item.name}</h2>
      <h4>Click in the marker for more details</h4>
    </div>`
  ).on('click', function () {
    // sidebar.hide()
    sidebar.setContent(
      `
      <iframe
        src='${item.url}'
        name='${item.name}'
        height='95%' 
        width='95%'
      >
      </iframe>
      `
    )
    sidebar.show()
  })
))

// initialize map
const map = L.map('map', {
  center: [40, 0],
  zoom: 3,
  layers: [osm, formulaOneCircuits]
})

// configure sidebar
const sidebar = L.control.sidebar('sidebar', {
  position: 'left'
})

map.addControl(sidebar)

// initialize layer controls