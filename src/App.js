import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN;

const MapComponent = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [102.0, 0.5],
      zoom: 8,
    });

    map.on('load', () => {
      map.addSource('parcels', {
        type: 'geojson',
        data: 'https://gist.githubusercontent.com/wavded/1200773/raw/e122cf709898c09758aecfef349964a8d73a83f3/sample.json',
      });

      map.addLayer({
        id: 'parcel-layer',
        type: 'fill',
        source: 'parcels',
        paint: {
          'fill-color': '#888888',
          'fill-opacity': 0.4,
        },
      });

      map.addLayer({
        id: 'parcel-outline',
        type: 'line',
        source: 'parcels',
        paint: {
          'line-color': '#000000',
          'line-width': 5,
        },
      });
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />;
};

export default MapComponent;
