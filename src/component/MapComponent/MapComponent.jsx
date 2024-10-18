// MapComponent.jsx
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {customMapConfig} from '../../config/mapConfig';
import { setupPointPopup } from './setupPointPopup';
import Marker from '../Marker/Marker';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN;

const MapComponent = ({ layers }) => {
  const mapContainer = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [centerCoordinates, setCenterCoordinates] = useState(customMapConfig.center); // Store center coordinates

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: customMapConfig.style,
      center: customMapConfig.center,
      zoom: customMapConfig.zoom,
      dragPan: false,
    });
    // Set the maximum zoom level
    map.setMaxZoom(20); // Set to a reasonable maximum zoom level (e.g., 20)
    setMapInstance(map); // Store the map instance in state
    map.on('load', () => {
      // Add ArcGIS World Imagery layer
      const arcGISUrl = 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer';
  
      // Add a raster source for the ArcGIS layer
      map.addSource('arcgis-imagery', {
        type: 'raster',
        tiles: [
          `${arcGISUrl}/export?bbox={bbox-epsg-3857}&bboxSR=3857&imageSR=3857&format=png&f=image`
        ],
        tileSize: 256,
      });

      // Add the ArcGIS layer to the map
      map.addLayer({
        id: 'arcgis-layer',
        type: 'raster',
        source: 'arcgis-imagery',
        paint: {},
      });

      // Loop through layers and add them to the map
      layers.forEach(layer => {
        map.addSource(layer.id, {
          type: 'geojson',
          data: layer.data,
        });

        map.addLayer({
          id: layer.id + '-layer',
          type: layer.type,
          source: layer.id,
          paint: layer.paint,
        });

        // If the layer is points, set up popup interaction
        if (layer.type === 'circle') {
          setupPointPopup(map, layer.id, mapboxgl);
        }
      });
      // Set center coordinates for the marker
      setCenterCoordinates(map.getCenter().toArray());
    });

    return () => map.remove();
  }, [layers]);

  return (<>
          <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />
          {mapInstance && <Marker map={mapInstance} coordinates={centerCoordinates} />} 
        </>);
};

export default MapComponent;