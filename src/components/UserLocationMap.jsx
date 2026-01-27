import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function UserLocationMap({ lat, lng }) {
  if (!lat || !lng) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-400 border rounded">
        Lokasi belum ditentukan
      </div>
    );
  }

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      className="h-64 w-full rounded-lg"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} />
    </MapContainer>
  );
}
