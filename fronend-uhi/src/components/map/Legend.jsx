import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function Legend({ info }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const legend = L.control({ position: "bottomright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div");

      div.style.background = "rgba(255,255,255,0.96)";
      div.style.padding = "14px";
      div.style.borderRadius = "12px";
      div.style.boxShadow = "0 10px 25px rgba(0,0,0,0.25)";
      div.style.fontSize = "12px";
      div.style.lineHeight = "1.4";
      div.style.width = "220px";

      div.innerHTML = `
        <div style="font-weight:700; font-size:13px; margin-bottom:8px text-justifly;">
          🌡️ Analisis Urban Heat Island (UHI)
        </div>

        <div style="font-size:11px; color:#555; margin-bottom:10px;">
          Periode: <b>${info?.startYear} - ${info?.endYear}</b>
        </div>

        <div style="margin-bottom:6px;">
          <span style="background:#1d4ed8; width:14px; height:14px; display:inline-block; margin-right:8px;"></span>
          <b>20 - 24°C</b> → Sangat Dingin
        </div>

        <div style="margin-bottom:6px;">
          <span style="background:#06b6d4; width:14px; height:14px; display:inline-block; margin-right:8px;"></span>
          <b>24 - 28°C</b> → Sejuk
        </div>

        <div style="margin-bottom:6px;">
          <span style="background:#22c55e; width:14px; height:14px; display:inline-block; margin-right:8px;"></span>
          <b>28 - 32°C</b> → Normal
        </div>

        <div style="margin-bottom:6px;">
          <span style="background:#facc15; width:14px; height:14px; display:inline-block; margin-right:8px;"></span>
          <b>32 - 36°C</b> → Hangat
        </div>

        <div style="margin-bottom:6px;">
          <span style="background:#f97316; width:14px; height:14px; display:inline-block; margin-right:8px;"></span>
          <b>36 - 40°C</b> → Panas
        </div>

        <div style="margin-bottom:6px;">
          <span style="background:#ef4444; width:14px; height:14px; display:inline-block; margin-right:8px;"></span>
          <b>> 40°C</b> → Sangat Panas (Urban Heat Island Tinggi)
        </div>

        <hr style="margin:10px 0;" />

        <div style="font-size:10px; color:#888;">
          * Data: Landsat 8/9 Thermal Band (ST_B10)<br/>
          * Semakin merah → semakin panas permukaan
        </div>
      `;

      return div;
    };

    legend.addTo(map);

    return () => map.removeControl(legend);
  }, [map, info]);

  return null;
}