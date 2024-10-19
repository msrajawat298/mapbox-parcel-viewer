import React from 'react';

const LayerToggle = ({ layers, layerVisibility, toggleLayer }) => {
  return (
    <div style={styles.controlPanel}>
      <h4>Toggle Layers</h4>
      {layers.map(layer => (
        <div key={layer.id} style={styles.checkboxContainer}>
          <input
            type="checkbox"
            id={layer.id}
            checked={layerVisibility[layer.id] || false}
            onChange={() => toggleLayer(layer.id)}
          />
          <label htmlFor={layer.id} style={styles.label}>{layer.id}</label>
        </div>
      ))}
    </div>
  );
};

// Custom styles for the control panel and checkboxes
const styles = {
  controlPanel: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 1,
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  label: {
    marginLeft: '8px',
  },
};

export default LayerToggle;
