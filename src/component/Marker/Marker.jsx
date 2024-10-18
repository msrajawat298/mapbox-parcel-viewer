// Marker.jsx
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const Marker = ({ map, coordinates }) => {
  useEffect(() => {
    if (map) {
      const marker = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map);

      return () => marker.remove();
    }
  }, [map, coordinates]);

  return null; // No need to render anything in this component
};

export default Marker;
