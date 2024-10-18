// layersConfig.js
export const layersConfig = [
    {
      id: 'polygons',
      data: 'https://raw.githubusercontent.com/openlayers/openlayers/refs/heads/main/examples/data/geojson/polygon-samples.geojson',
      type: 'fill',
      paint: {
        'fill-color': 'green',
        'fill-opacity': 0.5,
      },
    },
    {
      id: 'lines',
      data: 'https://raw.githubusercontent.com/openlayers/openlayers/refs/heads/main/examples/data/geojson/line-samples.geojson',
      type: 'line',
      paint: {
        'line-color': 'blue',
        'line-width': 2,
      },
    },
    {
      id: 'lines_streets',
      data: 'https://raw.githubusercontent.com/openlayers/openlayers/refs/heads/main/examples/data/geojson/vienna-streets.geojson',
      type: 'line',
      paint: {
        'line-color': 'blue',
        'line-width': 2,
      },
    },
    {
      id: 'points',
      data: 'https://raw.githubusercontent.com/openlayers/openlayers/refs/heads/main/examples/data/geojson/point-samples.geojson',
      type: 'circle',
      paint: {
        'circle-radius': 8,
        'circle-color': 'red',
      },
    },
    {
      id: 'roads',
      data: 'https://raw.githubusercontent.com/openlayers/openlayers/refs/heads/main/examples/data/geojson/roads-seoul.geojson',
      type: 'line',
      paint: {
        'line-color': '#ff5733',
        'line-width': 20,
      },
    },
    {
      id: 'polygons_switzerland',
      data: 'https://raw.githubusercontent.com/openlayers/openlayers/refs/heads/main/examples/data/geojson/switzerland.geojson',
      type: 'fill',
      paint: {
        'fill-color': '#ff785b',
        'fill-opacity': 1,
      },
    },
  ];
  
  