"use client";

import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/icons/marker-icon.png",
  iconUrl: "/icons/marker-icon.png",
});

function ContactMap() {
  const position = [10.822, 106.6257];

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "100%", width: "100%", minHeight: "300px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        zIndex={1}
      />
      <Marker position={position}>
        <Popup>
          <b>Our Office</b>
          <p>
            21 Lô K, Đường 659, KDC Phú Nhuận, P. Phước Long B, TP. Thủ Đức, TP.
            Hồ Chí Minh
          </p>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default ContactMap;
