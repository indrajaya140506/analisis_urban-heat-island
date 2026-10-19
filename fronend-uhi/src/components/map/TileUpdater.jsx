import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function TileUpdater({ tileUrl }) {
  const map = useMap();
  const layerRef = useRef(null);

  useEffect(() => {
    
    if (!tileUrl) {
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }
      return;
    }

    if (layerRef.current) {
      map.removeLayer(layerRef.current);
    }

   
    layerRef.current = L.tileLayer(tileUrl, {
      opacity: 0.65, 
      maxZoom: 18,
      zIndex: 100, 
    });

    layerRef.current.addTo(map);

    
    return () => {
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
      }
    };
  }, [tileUrl, map]);

  return null;
}