const ArcgisLayersConfig = [
  {
    id: 'arcgis-imagery',
    name: 'ArcGIS World Imagery',
    source: {
      type: 'raster',
      tiles: [
        'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/export?bbox={bbox-epsg-3857}&bboxSR=3857&imageSR=3857&format=png&f=image',
      ],
      tileSize: 256,
    },
    layer: {
      id: 'arcgis-imagery-layer',
      type: 'raster',
      source: 'arcgis-imagery',
      paint: {},
    },
  },
  {
    id: 'arcgis-boundaries',
    name: 'ArcGIS World Boundaries and Places',
    source: {
      type: 'raster',
      tiles: [
        'https://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/export?bbox={bbox-epsg-3857}&bboxSR=3857&imageSR=3857&size=256,256&format=png&f=image',
      ],
      tileSize: 256,
    },
    layer: {
      id: 'arcgis-boundaries-layer',
      type: 'raster',
      source: 'arcgis-boundaries',
      paint: {
        'raster-opacity': 0.5, // 50% opacity
      },
    },
  },
];

export default ArcgisLayersConfig;