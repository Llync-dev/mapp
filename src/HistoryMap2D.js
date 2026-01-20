import { MapContainer, TileLayer, CircleMarker, Polyline, Popup } from 'react-leaflet';

const HistoryMap2D = () => {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Civilization */}
      <CircleMarker center={[30.8, 31.0]} radius={8} color="#EAB308">
        <Popup>
          <strong>Ancient Egypt</strong><br />
          Old Kingdom
        </Popup>
      </CircleMarker>

      {/* Migration */}
      <Polyline
        positions={[
          [0, 20],
          [30, 40],
          [50, 80],
        ]}
        color="red"
        dashArray="6"
      />
    </MapContainer>
  );
};

export default HistoryMap2D;
