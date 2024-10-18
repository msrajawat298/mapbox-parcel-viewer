import React from 'react';
import MapComponent from './component/MapComponent/MapComponent';
import { layersConfig } from './config/layersConfig';

const App = () => {
  return (
    <div>
      <MapComponent layers={layersConfig} />
    </div>
  );
};

export default App;
