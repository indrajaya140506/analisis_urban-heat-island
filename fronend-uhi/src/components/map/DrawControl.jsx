import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-draw";

export default function DrawControl({ setPolygon }) {
  const map = useMap();
  const drawnItems = useRef(new L.FeatureGroup());

  useEffect(() => {
    if (!map) return;

    
    map.addLayer(drawnItems.current);

    
    const drawControl = new L.Control.Draw({
      position: "topright",
      draw: {
        rectangle: false,
        circle: false,
        circlemarker: false,
        marker: false,
        polyline: false,
        polygon: {
          allowIntersection: false,
          shapeOptions: {
            color: "#2563eb",
            weight: 3,
            fillOpacity: 0.2,
          },
        },
      },
      edit: {
        featureGroup: drawnItems.current,
        remove: true,
      },
    });

    map.addControl(drawControl);

    
    const onCreated = (e) => {
      const layer = e.layer;

      
      drawnItems.current.clearLayers();
      drawnItems.current.addLayer(layer);

      
      let geojson = null;

      if (layer && typeof layer.toGeoJSON === "function") {
        geojson = layer.toGeoJSON();
      }

      if (!geojson) {
        console.error("Invalid polygon layer:", layer);
        return;
      }

      console.log("🟢 GeoJSON:", geojson);

     
      const center = layer.getBounds().getCenter();

      layer.bindPopup(`
        <div style="
          font-size:12px;
          font-family:Arial;
        ">
          <b>🗺️ Polygon Aktif</b><br/>
          📍 Area siap dianalisis<br/>
          🌡️ Klik "Mulai Analisis"
        </div>
      `).openPopup(center);

      
      setPolygon(geojson);
    };

    
    const onDeleted = () => {
      drawnItems.current.clearLayers();
      setPolygon(null);
    };

   
    map.on(L.Draw.Event.CREATED, onCreated);
    map.on(L.Draw.Event.DELETED, onDeleted);

    
    return () => {
      map.removeControl(drawControl);
      map.off(L.Draw.Event.CREATED, onCreated);
      map.off(L.Draw.Event.DELETED, onDeleted);
    };
  }, [map, setPolygon]);

  return null;
}