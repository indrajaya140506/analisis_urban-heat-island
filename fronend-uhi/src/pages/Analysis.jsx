
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
    setChartData([]);

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

      setChartData([...chart]);
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
          bg-white/95 backdrop-blur-xl shadow-[8px_0_35px_rgba(15,23,42,0.07)]
          border-r border-slate-200/80 transition-transform duration-300 ease-in-out
          w-[340px]
          ${openPanel ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="h-full overflow-y-auto p-6 space-y-6">

            {/* HEADER */}
            <div className="flex items-center justify-center relative pb-5 border-b border-slate-100">
              <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-800 uppercase">
                Spatial
                <span className="ml-2 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent font-extrabold">
                  Analisis
                </span>
              </h1>

              <button
                onClick={() => setOpenPanel(!openPanel)}
                className="absolute right-0 p-2 rounded-xl
                bg-slate-50 border border-slate-200 text-slate-500
                hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200
                transition-all duration-200"
              >
                {openPanel ? "✕" : <PanelLeft size={16} />}
              </button>
            </div>

            {/* REGION */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-3">
                <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-slate-500">
                  Detected Region
                </label>
                <Globe size={15} className="text-emerald-600" />
              </div>

              <div className="mt-2 border border-slate-100 bg-slate-50/80 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700">
                {regionName || "Select area on map..."}
              </div>
            </div>

            {/* INPUT */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-slate-500">
                  Year Input
                </label>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  TIME RANGE
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <input
                  type="number"
                  placeholder="Start"
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/70 text-sm font-medium text-slate-700 outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white placeholder:text-slate-400"
                />

                <input
                  type="number"
                  placeholder="End"
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/70 text-sm font-medium text-slate-700 outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white placeholder:text-slate-400"
                />
              </div>

              {/* GEOMETRY */}
              <div className="mt-4 flex items-center justify-between border border-slate-100 bg-slate-50/70 rounded-xl px-4 py-3">
                <span className="text-[11px] font-bold tracking-wider text-slate-500">
                  GEOMETRY
                </span>

                <span className={`text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-full transition-all duration-300
                ${geometryPreview
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                  : "bg-slate-200/70 text-slate-500 border border-slate-200"}`}>
                  {geometryPreview ? "READY" : "EMPTY"}
                </span>
              </div>
            </div>

            {/* RUN */}
            <button
              onClick={handleAnalyze}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white
              text-sm font-semibold flex items-center justify-center gap-2
              shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-600/30
              hover:from-emerald-700 hover:to-teal-700 active:scale-[0.98]
              transition-all duration-300"
            >
              <Search size={15} />
              Run Analysis
            </button>

            {/* STAT */}
            <div className="relative bg-gradient-to-br from-white via-emerald-50/70 to-teal-50 border border-emerald-100 rounded-2xl p-4 shadow-sm overflow-hidden">

              {/* GLOW */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-300/20 blur-3xl rounded-full"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-400/20 blur-3xl rounded-full"></div>

              <div className="flex items-center justify-center gap-2 mb-4 relative z-10">
                <div className="p-2 rounded-lg bg-emerald-100/80">
                  <Globe size={15} className="text-emerald-700" />
                </div>
                <Thermometer size={15} className="text-red-500" />
                <span className="text-sm font-bold text-slate-700">
                  Temperature Statistics
                </span>
              </div>

              <div className="relative z-10">
                {chartData.length > 0 ? (
                  <UhiChart data={chartData} />
                ) : (
                  <div className="py-6 flex flex-col items-center gap-2">
                    <div className="p-3 rounded-full bg-white/80 border border-emerald-100">
                      <Thermometer size={20} className="text-emerald-400" />
                    </div>
                    <p className="text-xs text-slate-400 text-center font-medium">
                      Waiting for analysis...
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* TOGGLE SIDEBAR */}
        {!openPanel && (
          <button
            onClick={() => setOpenPanel(true)}
            className="hidden md:flex absolute top-4 left-4 z-[1000]
            bg-white/95 backdrop-blur-md border border-slate-200
            shadow-lg shadow-slate-900/5 rounded-xl p-3
            text-slate-600 hover:text-emerald-600 hover:bg-emerald-50
            hover:border-emerald-200 transition-all duration-200"
          >
            <PanelLeft size={17} />
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

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpenMobilePanel(true)}
          className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2
          bg-gradient-to-r from-emerald-600 to-teal-600 text-white
          px-6 py-3 text-xs font-bold tracking-wider uppercase
          rounded-full shadow-xl shadow-emerald-900/20
          flex items-center gap-2 hover:from-emerald-700 hover:to-teal-700
          active:scale-95 transition-all duration-300 z-[1001]"
        >
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

        {/* MOBILE DRAWER */}
        {openMobilePanel && (
          <div className="md:hidden fixed inset-0 z-[1002]">
            <div
              className="absolute inset-0 bg-slate-950/50 backdrop-blur-[3px]"
              onClick={() => setOpenMobilePanel(false)}
            />

            <div className="absolute bottom-0 left-0 right-0
              bg-white rounded-t-[28px] p-6 max-h-[90vh] overflow-y-auto
              shadow-[0_-15px_50px_rgba(15,23,42,0.15)]
              border-t border-slate-100 animate-in slide-in-from-bottom duration-300">

              <div className="w-12 h-1.5 rounded-full bg-slate-200 mx-auto mb-5"></div>

              <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-800 uppercase text-center mb-6">
                Spatial
                <span className="ml-2 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent font-extrabold">
                  Analisis
                </span>
              </h1>

              {/* REGION */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 mb-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-slate-500">
                    Detected Region
                  </label>
                  <Globe size={15} className="text-emerald-600" />
                </div>
                <div className="mt-2 border border-slate-100 bg-slate-50/80 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700">
                  {regionName || "Select area on map..."}
                </div>
              </div>

              {/* INPUT */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 mb-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-slate-500">
                    Year Input
                  </label>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    TIME RANGE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <input
                    type="number"
                    placeholder="Start"
                    value={startYear}
                    onChange={(e) => setStartYear(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/70 text-sm font-medium text-slate-700 outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white placeholder:text-slate-400"
                  />

                  <input
                    type="number"
                    placeholder="End"
                    value={endYear}
                    onChange={(e) => setEndYear(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/70 text-sm font-medium text-slate-700 outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white placeholder:text-slate-400"
                  />
                </div>

                {/* GEOMETRY */}
                <div className="mt-4 flex items-center justify-between border border-slate-100 bg-slate-50/70 rounded-xl px-4 py-3">
                  <span className="text-[11px] font-bold tracking-wider text-slate-500">
                    GEOMETRY
                  </span>

                  <span
                    className={`text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-full transition-all duration-300
                    ${geometryPreview
                      ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                      : "bg-slate-200/70 text-slate-500 border border-slate-200"}`}
                  >
                    {geometryPreview ? "READY" : "EMPTY"}
                  </span>
                </div>
              </div>

              {/* RUN BUTTON */}
              <button
                onClick={handleAnalyze}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white
                text-sm font-semibold flex items-center justify-center gap-2
                shadow-lg shadow-emerald-600/20 active:scale-[0.98]
                transition-all duration-300"
              >
                <Search size={16} />
                Run Analysis
              </button>

              {/* STAT */}
              <div className="relative bg-gradient-to-br from-white via-emerald-50/70 to-teal-50 border border-emerald-100 rounded-2xl p-4 mt-4 overflow-hidden shadow-sm">

                <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-300/20 blur-3xl rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-teal-400/20 blur-3xl rounded-full"></div>

                <div className="flex items-center justify-center gap-2 mb-4 relative z-10">
                  <div className="p-2 rounded-lg bg-emerald-100/80">
                    <Globe size={15} className="text-emerald-700" />
                  </div>
                  <Thermometer size={15} className="text-red-500" />
                  <span className="text-sm font-bold text-slate-700">
                    Temperature Statistics
                  </span>
                </div>

                <div className="relative z-10">
                  {chartData.length > 0 ? (
                    <UhiChart data={chartData} />
                  ) : (
                    <div className="py-6 flex flex-col items-center gap-2">
                      <div className="p-3 rounded-full bg-white/80 border border-emerald-100">
                        <Thermometer size={20} className="text-emerald-400" />
                      </div>
                      <p className="text-xs text-slate-400 text-center font-medium">
                        Waiting for analysis...
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}
