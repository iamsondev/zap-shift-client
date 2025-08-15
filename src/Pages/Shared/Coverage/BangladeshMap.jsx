import React, { useRef, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet marker icon issue
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

// Helper to move map
const FlyToLocation = ({ position, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, zoom);
    }
  }, [position, zoom, map]);
  return null;
};

const BangladeshMap = ({ serviceCenters }) => {
  const position = [23.685, 90.3563];
  const [searchText, setSearchText] = useState('');
  const [flyPosition, setFlyPosition] = useState(null);
  const markerRefs = useRef([]);

  // Auto search & fly when text changes
  useEffect(() => {
    if (!searchText.trim()) return;

    const matchIndex = serviceCenters.findIndex(center =>
      center.district.toLowerCase().includes(searchText.toLowerCase())
    );

    if (matchIndex !== -1) {
      const match = serviceCenters[matchIndex];
      setFlyPosition([match.latitude, match.longitude]);

      // Open popup after slight delay (ensures map has moved)
      setTimeout(() => {
        const marker = markerRefs.current[matchIndex];
        if (marker) {
          marker.openPopup();
        }
      }, 300);
    }
  }, [searchText, serviceCenters]);

  return (
    <div>
      {/* Search Box */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search district..."
          className="input input-bordered w-full"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Map */}
      <div className="w-full h-[520px] rounded-lg overflow-hidden shadow-lg">
        <MapContainer center={position} zoom={7} scrollWheelZoom={false} className="w-full h-full">
          {flyPosition && <FlyToLocation position={flyPosition} zoom={10} />}
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviceCenters.map((center, index) => (
            <Marker
              key={index}
              position={[center.latitude, center.longitude]}
              ref={(el) => (markerRefs.current[index] = el)}
            >
              <Popup>
                <strong>{center.district}</strong>
                <br />
                <strong className="text-green-500">{center.covered_area.join(', ')}</strong>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default BangladeshMap;
