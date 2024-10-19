import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { customMapConfig } from '../../config/mapConfig';
import { setupPointPopup } from './setupPointPopup';
import Marker from '../Marker/Marker';
import LayerToggle from '../LayerToggle/LayerToggle'; // Import the LayerToggle component
import LayersConfig from '../../config/layersConfig';
import ArcgisLayersConfig from '../../config/arcgisConfig';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN;

const MapComponent = () => {
  const mapContainer = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [centerCoordinates, setCenterCoordinates] = useState(customMapConfig.center); // Store center coordinates
  const [layerVisibility, setLayerVisibility] = useState({}); // Track layer visibility state

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: customMapConfig.style,
      center: customMapConfig.center,
      zoom: customMapConfig.zoom,
    });

    map.setMaxZoom(20); // Set max zoom level
    setMapInstance(map);

    map.on('load', () => {
      // Initialize LayersConfig on the map
      LayersConfig.forEach(layer => {
        map.addSource(layer.id, {
          type: 'geojson',
          data: layer.data,
        });

        map.addLayer({
          id: layer.id + '-layer',
          type: layer.type,
          source: layer.id,
          paint: layer.paint,
          layout: {
            visibility: 'none', // Initially hide all layers
          },
        });

        // If the layer is points (circle type), set up the popup
        if (layer.type === 'circle') {
          setupPointPopup(map, layer.id, mapboxgl); // Call the setupPointPopup function
        }

        // Initialize layer visibility state
        setLayerVisibility(prev => ({
          ...prev,
          [layer.id]: false,
        }));
      });
      // Load ArcGIS layers (from config)
      ArcgisLayersConfig.forEach(layerConfig => {
        map.addSource(layerConfig.id, layerConfig.source);

        map.addLayer({
          ...layerConfig.layer,
          layout: {
            visibility: 'none', // Initially hide all layers
          },
        });

        // Initialize ArcGIS layer visibility state
        setLayerVisibility(prev => ({
          ...prev,
          [layerConfig.id]: false,
        }));
      });
      // Set center coordinates for the marker
      setCenterCoordinates(map.getCenter().toArray());
    });

    return () => map.remove();
  }, [LayersConfig]);

  // Function to toggle layer visibility
  const toggleLayer = (layerId) => {
    if (!mapInstance) return;

    const visibility = layerVisibility[layerId] ? 'none' : 'visible';
    mapInstance.setLayoutProperty(layerId + '-layer', 'visibility', visibility);

    // Update the visibility state
    setLayerVisibility(prev => ({
      ...prev,
      [layerId]: !prev[layerId],
    }));
  };

  return (
    <>
      <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />

      {/* Use LayerToggle component */}
      <LayerToggle layers={[...LayersConfig, ...ArcgisLayersConfig]}  layerVisibility={layerVisibility} toggleLayer={toggleLayer} />

      {mapInstance && <Marker map={mapInstance} coordinates={centerCoordinates} />}
    </>
  );
};

export default MapComponent;
