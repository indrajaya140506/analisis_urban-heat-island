import { MapContainer, TileLayer, ZoomControl, LayersControl } from "react-leaflet";
import Legend from "./Legend";
import DrawControl from "./DrawControl";
import TileUpdater from "./TileUpdater";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useEffect } from "react";

const { BaseLayer } = LayersControl;

export default function MapView({
  tileUrl,
  setPolygon,
  info,
  showLegend,
}) {

  useEffect(() => {
  document.title = "Maps - Sistem Analisis Urban Heat Island";
}, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={[-8.4095, 115.1889]}
        zoom={9}
        style={{ height: "100%", width: "100%" }}
        tap={false}
        zoomControl={false}
      >

        {}
        <LayersControl position="topright">

          {}
          <BaseLayer checked name="Google Satellite Hybrid">
            <TileLayer
              attribution="&copy; Google Maps"
              url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
            />
          </BaseLayer>

          {}
          <BaseLayer name="OpenStreetMap">
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>

          {}
          <BaseLayer name="Google Terrain">
            <TileLayer
              attribution="&copy; Google Maps"
              url="https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
            />
          </BaseLayer>

        </LayersControl>

        {}
        <ZoomControl position="topright" />

        {}
        <TileUpdater tileUrl={tileUrl} />

        {}
        <DrawControl setPolygon={setPolygon} />

        {}
        {showLegend && <Legend info={info} />}
      </MapContainer>
    </div>
  );
}