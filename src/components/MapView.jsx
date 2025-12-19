import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import mitra from "../database/DataMitra";
import MitraSummary from "./MitraSummary";

// ICON PER CATEGORY
const iconBase =
  "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/";

const icons = {
  DCCC: "marker-icon-red.png",
  DPKB: "marker-icon-yellow.png",
  DCSA: "marker-icon-blue.png",
  PCCR: "marker-icon-green.png",
  PFFR: "marker-icon-orange.png",
  CCRO: "marker-icon-violet.png",
  DEFAULT: "marker-icon-grey.png",
};

const getIcon = (cat) =>
  new L.Icon({
    iconUrl: iconBase + (icons[cat] || icons.DEFAULT),
    iconSize: [18, 28],
    iconAnchor: [9, 28],
  });

export default function MapView() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filtered = mitra.filter((item) => {
    const keyword =
      `${item.nama} ${item.kota} ${item.provinsi} ${item.business_category}`.toLowerCase();

    return (
      keyword.includes(search.toLowerCase()) &&
      (!selectedCategory || item.business_category === selectedCategory)
    );
  });

  return (
    <div className="space-y-4">
      {/* SUMMARY */}
      <MitraSummary
        mitra={mitra}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Cari Kota / Provinsi / Nama / Brand"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-red-500 outline-none"
      />

      {/* MAP */}
      <div className="border-4 border-red-600 rounded-2xl overflow-hidden">
        <MapContainer
          center={[-2.5489, 118.0149]}
          zoom={4}
          className="w-full h-[350px] md:h-[500px]"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {filtered.map((item) => (
            <Marker
              key={item.id}
              position={[item.lat, item.lng]}
              icon={getIcon(item.business_category)}
            >
              <Popup>
                <strong>{item.nama}</strong>
                <br />
                {item.kota}, {item.provinsi}
                <br />
                {item.business_category}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
