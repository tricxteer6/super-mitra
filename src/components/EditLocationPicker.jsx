import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationMarker({ position, onChange }) {
  const [pos, setPos] = useState(position);

  useEffect(() => {
    setPos(position);
  }, [position]);

  useMapEvents({
    click(e) {
      setPos(e.latlng);
      onChange(e.latlng);
    },
  });

  return pos ? <Marker position={pos} /> : null;
}

export default function EditLocationPicker({ lat, lng, onChange }) {
  const [ready, setReady] = useState(false);

  const center = lat && lng ? [Number(lat), Number(lng)] : [-6.2, 106.8];

  useEffect(() => {
    setReady(false);
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, [lat, lng]);

  if (!ready) return <div className="h-64" />;

  return (
    <MapContainer
      center={center}
      zoom={14}
      scrollWheelZoom={true}
      className="h-64 w-full rounded-lg"
      style={{ zIndex: 0 }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker
        position={lat && lng ? { lat: Number(lat), lng: Number(lng) } : null}
        onChange={onChange}
      />
    </MapContainer>
  );
}
