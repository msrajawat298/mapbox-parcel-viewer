export const setupPointPopup = (map, layerId, mapboxgl) => {
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    map.on('mouseenter', layerId + '-layer', (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const name = e.features[0].properties.name;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      popup.setLngLat(coordinates)
           .setHTML(name)
           .addTo(map);
    });

    map.on('mouseleave', layerId + '-layer', () => {
      popup.remove();
    });
  };