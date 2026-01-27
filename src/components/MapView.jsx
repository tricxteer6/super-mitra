import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import api from "../services/api";
import MitraSummary from "./MitraSummary";

const iconBase =
  "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/";

const kemitraanColors = {
  DCC: "red",
  "DCC-XTRA": "blue",
  DBDS: "green",
  DCBK: "orange",
  CCR: "violet",
  DCCC: "yellow",
  DCSA: "grey",
  DMCC: "red",
  DPKB: "blue",
  MHRE: "green",
  PFFR: "orange",
  PCCR: "violet",
};

function getIconForCategory(category) {
  const color = kemitraanColors[category] || "grey";

  return new L.Icon({
    iconUrl: `${iconBase}marker-icon-${color}.png`,
    iconSize: [18, 28],
    iconAnchor: [9, 28],
  });
}

export default function MapView() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mitra, setMitra] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/public/users")
      .then((res) => {
        const users = Array.isArray(res.data) ? res.data : res.data.data || [];

        const cleanUsers = users.filter(
          (u) => u.role !== "admin" && u.lat && u.lng,
        );

        setMitra(cleanUsers);
      })
      .catch((err) => {
        console.error("MAP API ERROR:", err);
        setMitra([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = Array.isArray(mitra)
    ? mitra.filter((item) => {
        const keyword = `
        ${item.nama || ""}
        ${item.kota || ""}
        ${item.provinsi || ""}
        ${item.kemitraan || ""}
      `.toLowerCase();

        return (
          keyword.includes(search.toLowerCase()) &&
          (!selectedCategory || item.kemitraan === selectedCategory)
        );
      })
    : [];

  if (loading) {
    return <p className="text-center py-20">Loading map...</p>;
  }

  console.log("MITRA TYPE:", typeof mitra, mitra);

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
        placeholder="Cari Nama / Kota / Provinsi / Kemitraan"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-red-500 outline-none"
      />

      {/* MAP */}
      <div className="border-4 border-red-600 rounded-2xl overflow-hidden">
        <MapContainer
          center={[-2.5489, 118.0149]}
          zoom={5}
          className="w-full h-75 md:h-125 lg:h-150"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {filtered.map((item) => (
            <Marker
              key={item.id}
              position={[Number(item.lat), Number(item.lng)]}
              icon={getIconForCategory(item.kemitraan)}
            >
              <Popup>
                <div className="text-sm space-y-1">
                  <strong>{item.nama}</strong>
                  <div>
                    {item.kota || "-"}, {item.provinsi || "-"}
                  </div>
                  <div className="text-xs text-gray-500">{item.kemitraan}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
