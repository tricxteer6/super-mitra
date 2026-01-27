import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";

/* FIX ICON */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* ================= SEARCH ================= */
function SearchControl({ onSelect }) {
  const map = useMap();

  useEffect(() => {
    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: false,
      position: "topleft",
    })
      .on("markgeocode", (e) => {
        const latlng = e.geocode.center;

        map.setView(latlng, 15, { animate: false });

        onSelect({
          lat: latlng.lat,
          lng: latlng.lng,
        });
      })
      .addTo(map);

    return () => map.removeControl(geocoder);
  }, [map, onSelect]);

  return null;
}

/* ================= MARKER ================= */
function LocationMarker({ lat, lng, onSelect }) {
  const [position, setPosition] = useState(
    lat && lng ? [Number(lat), Number(lng)] : null,
  );

  useEffect(() => {
    if (lat && lng) {
      setPosition([Number(lat), Number(lng)]);
    }
  }, [lat, lng]);

  useMapEvents({
    click(e) {
      // klik hanya aktif kalau TIDAK tekan CTRL
      if (e.originalEvent.ctrlKey) return;

      const pos = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      };

      setPosition([pos.lat, pos.lng]);
      onSelect(pos);
    },
  });

  return position ? <Marker position={position} /> : null;
}

/* ================= CTRL DRAG HANDLER ================= */
function CtrlDragHandler() {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();

    // default: TIDAK BISA DRAG
    map.dragging.disable();
    container.style.cursor = "crosshair";

    const onKeyDown = (e) => {
      if (e.ctrlKey) {
        map.dragging.enable();
        container.style.cursor = "grab";
      }
    };

    const onKeyUp = (e) => {
      if (!e.ctrlKey) {
        map.dragging.disable();
        container.style.cursor = "crosshair";
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [map]);

  return null;
}

/* ================= MAIN ================= */
export default function MapPicker({ lat, lng, onSelect }) {
  return (
    <MapContainer
      center={[lat || -6.2, lng || 106.8]}
      zoom={13}
      className="h-75 w-full rounded-xl"
      zoomAnimation={true}
      zoomAnimationThreshold={4}
      fadeAnimation={true}
      markerZoomAnimation={true}
      scrollWheelZoom={true} // zoom tetap jalan
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <CtrlDragHandler />
      <SearchControl onSelect={onSelect} />
      <LocationMarker lat={lat} lng={lng} onSelect={onSelect} />
    </MapContainer>
  );
}
