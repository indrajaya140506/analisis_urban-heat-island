
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function TileUpdater({ tileUrl }) {
  const map = useMap();
  const layerRef = useRef(null);

  useEffect(() => {
    // Remove existing layer when tileUrl is empty
    if (!tileUrl) {
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }

      return;
    }

    // Remove previous tile layer
    if (layerRef.current) {
      map.removeLayer(layerRef.current);
    }

    // Create new tile layer
    layerRef.current = L.tileLayer(tileUrl, {
      opacity: 0.65,
      maxZoom: 18,
      zIndex: 100,
    });

    // Add tile layer to map
    layerRef.current.addTo(map);

    // Cleanup when tileUrl changes or component unmounts
    return () => {
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
      }
    };
  }, [tileUrl, map]);

  return null;
}
