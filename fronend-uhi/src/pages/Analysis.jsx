import { useState, useEffect } from "react";
import { analyzeUHI } from "../services/geeService";
import MapView from "../components/map/MapView";
import UhiChart from "../components/map/UhiLayer";
import GlobalLoader from "../components/ui/GlobalLoader";
import Header from "../components/ui/Header";
import { Globe, Thermometer, PanelLeft, Search } from "lucide-react";

export default function Analysis() {
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [chartData, setChartData] = useState([]);
  const [tileUrl, setTileUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [polygon, setPolygon] = useState(null);
  const [regionName, setRegionName] = useState("");
  const [geometryPreview, setGeometryPreview] = useState(null);
  const [analysisDone, setAnalysisDone] = useState(false);

  const [openPanel, setOpenPanel] = useState(true);
  const [openMobilePanel, setOpenMobilePanel] = useState(false);

  useEffect(() => {
    document.title = "Analysis - Sistem Analisis Urban Heat Island";
  }, []);

  const BALI_COORDS = [
    [[114.43, -8.06], [115.71, -8.06], [115.71, -8.85], [114.43, -8.85], [114.43, -8.06]]
  ];

  const normalizeCoordinates = (poly) => {
    if (!poly) return null;
    if (poly.type === "Feature") return poly.geometry?.coordinates;
    if (Array.isArray(poly)) return poly;
    return null;
  };

  const getRegionName = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&zoom=10&lat=${lat}&lon=${lon}`
      );
      const data = await res.json();
      return (
        data.address?.region ||
        data.address?.county ||
        data.address?.city ||
        data.address?.state ||
        "Unknown Region"
      );
    } catch {
      return "Unknown Region";
    }
  };

  const handlePolygon = async (geojson) => {
    setPolygon(geojson);

    const coords = geojson.geometry.coordinates[0];
    let latSum = 0;
    let lngSum = 0;

    coords.forEach((c) => {
      lngSum += c[0];
      latSum += c[1];
    });

    const region = await getRegionName(
      latSum / coords.length,
      lngSum / coords.length
    );

    setRegionName(region);
    setGeometryPreview(coords);
  };

  const handleAnalyze = async () => {
    if (!startYear || !endYear) {
      alert("Tentukan rentang tahun terlebih dahulu");
      return;
    }

    setLoading(true);
    setAnalysisDone(false);
    setChartData([]); // penting reset

    try {
      const coords = normalizeCoordinates(polygon);

      const payload = {
        start_year: Number(startYear),
        end_year: Number(endYear),
        coordinates: coords || BALI_COORDS,
        region_name: regionName,
      };

      const res = await analyzeUHI(payload);

      const chart = Array.isArray(res?.chart) ? res.chart : [];

      setChartData([...chart]); // FIX RE-RENDER
      setTileUrl(res?.tile || "");
      setAnalysisDone(true);
      setOpenMobilePanel(false);
    } catch (err) {
      console.error(err);
      alert("Gagal melakukan analisis");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] overflow-hidden">
      <Header />

      {loading && <GlobalLoader text="Running Spatial Analysis..." />}

      <main className="flex-1 relative">

        {/* SIDEBAR DESKTOP */}
        <div
          className={`hidden md:block absolute top-0 left-0 h-full z-[999]
          bg-white shadow-xl border-r transition-transform duration-300
          w-[340px]
          ${openPanel ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="h-full overflow-y-auto p-6 space-y-6">

            {/* HEADER */}
            <div className="flex items-center justify-center relative">
              <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-800 uppercase">
                Spatial
                <span className="ml-2 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent font-extrabold">
                  Analisis
                </span>
              </h1>

              <button
                onClick={() => setOpenPanel(!openPanel)}
                className="absolute right-0 p-1.5 rounded-lg
                bg-white/60 backdrop-blur-sm
                opacity-40 hover:opacity-100
                transition"
              >
                {openPanel ? "✕" : <PanelLeft size={16} />}
              </button>
            </div>

            {/* REGION */}
            <div className="bg-white border rounded-2xl p-4">
              <label className="text-xs font-bold uppercase">
                Detected Region
              </label>
              <div className="mt-2 border rounded-xl px-4 py-3">
                {regionName || "Select area on map..."}
              </div>
            </div>

            {/* INPUT */}
            <div className="bg-white border rounded-2xl p-4">
              <label className="text-xs font-bold uppercase">
                Year Input
              </label>

              <div className="grid grid-cols-2 gap-3 mt-3">
                <input
                  type="number"
                  placeholder="Start"
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                  className="p-3 rounded-xl border"
                />

                <input
                  type="number"
                  placeholder="End"
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                  className="p-3 rounded-xl border"
                />
              </div>

              {/* GEOMETRY */}
              <div className="mt-4 flex items-center justify-between border rounded-xl px-4 py-3">
                <span className="text-xs font-bold text-slate-600">
                  GEOMETRY
                </span>

                <span className={`text-xs font-bold px-3 py-1 rounded-full
                ${geometryPreview
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-200 text-slate-600"}`}>
                  {geometryPreview ? "READY" : "EMPTY"}
                </span>
              </div>
            </div>

            {/* RUN */}
            <button
              onClick={handleAnalyze}
              className="w-full py-2.5 rounded-xl bg-emerald-600 text-white
              text-sm font-semibold flex items-center justify-center gap-2
              hover:bg-emerald-700 transition"
            >
              <Search size={14} />
              Run Analysis
            </button>

            {/* STAT */}
        <div className="relative bg-gradient-to-br from-white via-emerald-50 to-emerald-100 border border-emerald-200 rounded-2xl p-4 shadow-sm overflow-hidden">

  {/* soft glow hijau */}
  <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-300/20 blur-2xl rounded-full"></div>
  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-400/20 blur-2xl rounded-full"></div>
  <div className="flex items-center justify-center gap-2 mb-3">
    <Globe size={16} className="text-emerald-600" />
    <Thermometer size={14} className="text-red-500" />
    <span className="text-sm font-bold">
      Temperature Statistics
    </span>
  </div>

  {chartData.length > 0 ? (
    <UhiChart data={chartData} />
  ) : (
    <p className="text-xs text-slate-400 text-center">
      Waiting for analysis...
    </p>
  )}
</div>

          </div>
        </div>

        {/* TOGGLE SIDEBAR */}
        {!openPanel && (
          <button
            onClick={() => setOpenPanel(true)}
            className="hidden md:flex absolute top-4 left-4 z-[1000]
            bg-white border shadow-lg rounded-lg p-2
            hover:bg-slate-100 transition"
          >
            <PanelLeft size={16} />
          </button>
        )}

        {/* MAP */}
        <div className="absolute inset-0">
          <MapView
            tileUrl={tileUrl}
            setPolygon={handlePolygon}
            info={{ startYear, endYear }}
            showLegend={analysisDone}
          />
        </div>

       <button
  onClick={() => setOpenMobilePanel(true)}
  className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2
  bg-gradient-to-r from-emerald-600 to-emerald-700 text-white
  px-5 py-2.5 text-xs font-semibold tracking-wider uppercase
  rounded-full shadow-lg flex items-center gap-2
  hover:from-emerald-700 hover:to-emerald-800
  transition-all duration-300 z-[1001]"
>
  {/* icon magnifier (GIS feel) */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>

  Analysis Panel
</button>

        {/* MOBILE DRAWER (FIXED - SAME AS DESKTOP UI) */}
{openMobilePanel && (
  <div className="md:hidden fixed inset-0 z-[1002]">
    <div
      className="absolute inset-0 bg-black/40"
      onClick={() => setOpenMobilePanel(false)}
    />

    <div className="absolute bottom-0 left-0 right-0
      bg-white rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto">
<h1 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-800 uppercase text-center mb-5">
  Spatial
  <span className="ml-2 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent font-extrabold">
    Analisis
  </span>
</h1>
      {/* REGION (SAMA PERSIS DENGAN DESKTOP) */}
      <div className="bg-white border rounded-2xl p-4 mb-4">
        <label className="text-xs font-bold uppercase">
          Detected Region
        </label>
        <div className="mt-2 border rounded-xl px-4 py-3">
          {regionName || "Select area on map..."}
        </div>
      </div>

      {/* INPUT (SAMA PERSIS DENGAN DESKTOP) */}
      <div className="bg-white border rounded-2xl p-4 mb-4">
        <label className="text-xs font-bold uppercase">
          Year Input
        </label>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <input
            type="number"
            placeholder="Start"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            className="p-3 rounded-xl border"
          />

          <input
            type="number"
            placeholder="End"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            className="p-3 rounded-xl border"
          />
        </div>

        {/* GEOMETRY STATUS (SAMA PERSIS) */}
        <div className="mt-4 flex items-center justify-between border rounded-xl px-4 py-3">
          <span className="text-xs font-bold text-slate-600">
            GEOMETRY
          </span>

          <span
            className={`text-xs font-bold px-3 py-1 rounded-full
            ${geometryPreview
              ? "bg-emerald-600 text-white"
              : "bg-slate-200 text-slate-600"}`}
          >
            {geometryPreview ? "READY" : "EMPTY"}
          </span>
        </div>
      </div>

      {/* RUN BUTTON */}
      <button
        onClick={handleAnalyze}
        className="w-full py-3 rounded-xl bg-emerald-600 text-white
        text-sm font-semibold flex items-center justify-center gap-2"
      >
        <Search size={16} />
        Run Analysis
      </button>

      {/* STAT (FIXED BIAR KONSISTEN) */}
<div className="relative bg-gradient-to-br from-white via-emerald-50 to-emerald-100 border border-emerald-200 rounded-2xl p-4 mt-4 overflow-hidden">

  {/* glow effect biar sama kayak desktop */}
  <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-300/20 blur-2xl rounded-full"></div>
  <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-emerald-400/20 blur-2xl rounded-full"></div>

  <div className="flex items-center justify-center gap-2 mb-3 relative z-10">
    <Globe size={16} className="text-emerald-600" />
    <Thermometer size={14} className="text-red-500" />
    <span className="text-sm font-bold">
      Temperature Statistics
    </span>
  </div>

  {chartData.length > 0 ? (
    <div className="relative z-10">
      <UhiChart data={chartData} />
    </div>
  ) : (
    <p className="text-xs text-slate-400 text-center relative z-10">
      Waiting for analysis...
    </p>
  )}
</div>

    </div>
  </div>
)}

      </main>
    </div>
  );
}