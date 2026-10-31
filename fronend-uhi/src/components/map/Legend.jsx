
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

      div.style.cssText = `
        width: 245px;
        padding: 18px;
        background: rgba(255, 255, 255, 0.97);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(226, 232, 240, 0.9);
        border-radius: 16px;
        box-shadow: 0 8px 30px rgba(15, 23, 42, 0.13);
        font-family: 'Poppins', sans-serif;
        color: #1e293b;
        font-size: 12px;
        line-height: 1.5;
      `;

      div.innerHTML = `
        <div style="
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
          padding-bottom: 13px;
          border-bottom: 1px solid #e2e8f0;
        ">
          <div style="
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff7ed;
            border-radius: 11px;
            font-size: 19px;
            flex-shrink: 0;
          ">
            🌡️
          </div>

          <div>
            <div style="
              font-size: 12px;
              font-weight: 700;
              color: #0f172a;
              letter-spacing: -0.2px;
            ">
              Urban Heat Island
            </div>

            <div style="
              font-size: 10px;
              color: #94a3b8;
              font-weight: 500;
            ">
              Temperature Analysis
            </div>
          </div>
        </div>

        <div style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #f8fafc;
          padding: 9px 11px;
          border-radius: 9px;
          margin-bottom: 14px;
        ">
          <span style="
            color: #64748b;
            font-size: 10px;
            font-weight: 500;
          ">
            Periode Analisis
          </span>

          <span style="
            color: #334155;
            font-size: 11px;
            font-weight: 700;
          ">
            ${info?.startYear} – ${info?.endYear}
          </span>
        </div>

        <div style="
          font-size: 10px;
          font-weight: 700;
          color: #64748b;
          letter-spacing: 0.7px;
          text-transform: uppercase;
          margin-bottom: 10px;
        ">
          Temperature Scale
        </div>

        <div style="display: flex; flex-direction: column; gap: 9px;">

          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 9px;">
              <span style="width: 13px; height: 13px; background: #1d4ed8; border-radius: 4px;"></span>
              <span style="color: #475569; font-size: 11px;">Sangat Dingin</span>
            </div>
            <b style="font-size: 11px; color: #1e293b;">20–24°C</b>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 9px;">
              <span style="width: 13px; height: 13px; background: #06b6d4; border-radius: 4px;"></span>
              <span style="color: #475569; font-size: 11px;">Sejuk</span>
            </div>
            <b style="font-size: 11px; color: #1e293b;">24–28°C</b>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 9px;">
              <span style="width: 13px; height: 13px; background: #22c55e; border-radius: 4px;"></span>
              <span style="color: #475569; font-size: 11px;">Normal</span>
            </div>
            <b style="font-size: 11px; color: #1e293b;">28–32°C</b>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 9px;">
              <span style="width: 13px; height: 13px; background: #facc15; border-radius: 4px;"></span>
              <span style="color: #475569; font-size: 11px;">Hangat</span>
            </div>
            <b style="font-size: 11px; color: #1e293b;">32–36°C</b>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 9px;">
              <span style="width: 13px; height: 13px; background: #f97316; border-radius: 4px;"></span>
              <span style="color: #475569; font-size: 11px;">Panas</span>
            </div>
            <b style="font-size: 11px; color: #1e293b;">36–40°C</b>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 9px;">
              <span style="width: 13px; height: 13px; background: #ef4444; border-radius: 4px;"></span>
              <span style="color: #475569; font-size: 11px;">Sangat Panas</span>
            </div>
            <b style="font-size: 11px; color: #dc2626;">&gt; 40°C</b>
          </div>

        </div>

        <div style="
          margin-top: 15px;
          padding-top: 12px;
          border-top: 1px solid #e2e8f0;
        ">
          <div style="
            font-size: 10px;
            color: #64748b;
            line-height: 1.7;
          ">
            <div>Data: Landsat 8/9 Thermal Band (ST_B10)</div>
            <div style="
              display: flex;
              align-items: center;
              gap: 6px;
              margin-top: 5px;
              color: #94a3b8;
            ">
              <span style="color: #ef4444;">●</span>
              Semakin merah, semakin tinggi suhu permukaan.
            </div>
          </div>
        </div>
      `;

      return div;
    };

    legend.addTo(map);

    return () => map.removeControl(legend);
  }, [map, info]);

  return null;
}
