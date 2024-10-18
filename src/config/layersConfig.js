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
      id: 'points',
      data: 'https://raw.githubusercontent.com/openlayers/openlayers/refs/heads/main/examples/data/geojson/point-samples.geojson',
      type: 'circle',
      paint: {
        'circle-radius': 8,
        'circle-color': 'red',
      },
    },
    // Add new layers here in the future
  ];
  