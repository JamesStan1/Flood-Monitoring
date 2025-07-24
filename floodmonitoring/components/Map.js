import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Cagayan de Oro coordinates
const DEFAULT_CENTER = [8.723305556, 124.8045833];
const DEFAULT_ZOOM = 13;

const getColorForLevel = (level) => {
  switch (level) {
    case 'severe': return 'red';
    case 'high': return 'orange';
    case 'moderate': return 'yellow';
    default: return 'blue';
  }
};

const Map = ({ floodData }) => {
  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Example flood markers around Cagayan de Oro */}
      {[
        {
          id: 1,
          location: [8.723305556, 124.8045833],
          level: 'moderate',
          lastUpdated: new Date()
        },
        {
          id: 2,
          location: [8.7333, 124.8145],
          level: 'high',
          lastUpdated: new Date()
        },
        {
          id: 3,
          location: [8.7133, 124.7945],
          level: 'low',
          lastUpdated: new Date()
        }
      ].map((data) => (
        <Circle
          key={data.id}
          center={data.location}
          radius={500}
          pathOptions={{
            fillColor: getColorForLevel(data.level),
            color: getColorForLevel(data.level),
            fillOpacity: 0.5,
          }}
        >
          <Popup>
            <div className="space-y-1">
              <h3 className="font-semibold">Monitoring Station #{data.id}</h3>
              <p className={`text-sm ${
                data.level === 'high' ? 'text-orange-500' :
                data.level === 'moderate' ? 'text-yellow-500' : 'text-blue-500'
              }`}>
                {data.level.charAt(0).toUpperCase() + data.level.slice(1)} flood risk
              </p>
              <p className="text-xs text-gray-500">
                Last updated: {new Date(data.lastUpdated).toLocaleString()}
              </p>
            </div>
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  );
};

export default Map;