import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import mitra from "../database/DataMitra";

import L from "leaflet";

// ===== ICON WARNA PER CATEGORY =====
const iconBaseUrl =
  "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/";

const categoryIcons = {
  DCCC: "marker-icon-red.png",
  DPKB: "marker-icon-yellow.png",
  DCSA: "marker-icon-blue.png",
  PCCR: "marker-icon-green.png",
  PFFR: "marker-icon-orange.png",
  CCRO: "marker-icon-violet.png",
  DEFAULT: "marker-icon-grey.png",
};

const getIcon = (category) =>
  new L.Icon({
    iconUrl:
      iconBaseUrl +
      (categoryIcons[category] || categoryIcons.DEFAULT),
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [18, 28],       // ukuran lebih kecil
    iconAnchor: [9, 28],
    popupAnchor: [0, -25],
    shadowSize: [28, 28],
  });

export default function MapView() {
  return (
    <div className="border-5 p-3 rounded-3xl border-red-600 hover:border-red-700 transition-all">
    <MapContainer
      center={[-2.5489, 118.0149]}
      zoom={4}
      className="w-74 md:w-150 md:h-100 h-50 rounded-2xl"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {mitra.map((item) => (
        <Marker
          key={item.id}
          position={[item.lat, item.lng]}
          icon={getIcon(item.business_category)}
        >
          <Popup>
            <strong>{item.nama}</strong>
            <br />
            {item.business_category}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </div>
  );
}
