
import { useState, useEffect } from "react";
import { analyzeUHI } from "../services/geeService";
import MapView from "../components/map/MapView";
import UhiChart from "../components/map/UhiLayer";
import GlobalLoader from "../components/ui/GlobalLoader";
import Header from "../components/ui/Header";
import {
  Globe,
  Thermometer,
  PanelLeft,
  Search,
  MapPin,
  CalendarDays,
  ChevronRight,
  X,
} from "lucide-react";

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

  // SHARED PANEL CONTENT
  const renderAnalysisPanel = () => (
    <div className="space-y-7">

      {/* REGION */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-slate-400">
            Study Area
          </label>
          <span className="text-[10px] font-semibold text-slate-400">
            01
          </span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-emerald-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <MapPin size={18} className="text-emerald-700" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                Detected Region
              </p>
              <p className="text-sm font-semibold text-slate-800 mt-1 truncate">
                {regionName || "Select area on map..."}
              </p>
            </div>

            <ChevronRight size={16} className="text-slate-300" />
          </div>
        </div>
      </section>

      {/* YEAR INPUT */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-slate-400">
            Analysis Period
          </label>
          <span className="text-[10px] font-semibold text-slate-400">
            02
          </span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays size={15} className="text-emerald-600" />
            <span className="text-xs font-semibold text-slate-600">
              Select year range
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                Start Year
              </label>
              <input
                type="number"
                placeholder="2018"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-slate-200 bg-slate-50/50 text-sm font-semibold text-slate-700 outline-none transition-all focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 placeholder:font-normal placeholder:text-slate-300"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                End Year
              </label>
              <input
                type="number"
                placeholder="2025"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-slate-200 bg-slate-50/50 text-sm font-semibold text-slate-700 outline-none transition-all focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 placeholder:font-normal placeholder:text-slate-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* GEOMETRY */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-slate-400">
            Spatial Geometry
          </label>
          <span className="text-[10px] font-semibold text-slate-400">
            03
          </span>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">
              <Globe size={17} className="text-slate-500" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700">
                Selected Polygon
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                Geographic boundary
              </p>
            </div>
          </div>

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider
            ${geometryPreview
              ? "bg-emerald-50 text-emerald-700"
              : "bg-slate-100 text-slate-400"}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${geometryPreview ? "bg-emerald-500" : "bg-slate-400"}`}></span>
            {geometryPreview ? "READY" : "EMPTY"}
          </div>
        </div>
      </section>

      {/* RUN ANALYSIS */}
      <button
        onClick={handleAnalyze}
        className="group w-full h-12 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md hover:shadow-emerald-900/10 active:scale-[0.99] transition-all duration-200"
      >
        <Search size={16} />
        Run Analysis
        <ChevronRight size={15} className="opacity-60 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* TEMPERATURE STATISTICS */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-slate-400">
            Analytical Results
          </label>
          <span className="text-[10px] font-semibold text-slate-400">
            04
          </span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                <Thermometer size={16} className="text-orange-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Temperature Statistics
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Urban Heat Island Analysis
                </p>
              </div>
            </div>
            <Globe size={16} className="text-slate-300" />
          </div>

          <div className="p-4">
            {chartData.length > 0 ? (
              <UhiChart data={chartData} />
            ) : (
              <div className="py-8 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full border border-slate-100 bg-slate-50 flex items-center justify-center mb-3">
                  <Thermometer size={21} className="text-slate-300" />
                </div>
                <p className="text-xs font-semibold text-slate-500">
                  Waiting for analysis
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  Run analysis to display temperature data
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="pt-4 border-t border-slate-100">
        <p className="text-[10px] text-slate-400 text-center tracking-wide">
          URBAN HEAT ISLAND · SPATIAL ANALYSIS
        </p>
      </div>

    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] overflow-hidden">
      <Header />

      {loading && <GlobalLoader text="Running Spatial Analysis..." />}

      <main className="flex-1 relative">

        {/* DESKTOP SIDEBAR */}
        <div
          className={`hidden md:block absolute top-0 left-0 h-full z-[999]
          bg-white border-r border-slate-200
          transition-transform duration-300 ease-in-out
          w-[340px]
          ${openPanel ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="h-full overflow-y-auto p-6">

            {/* SIDEBAR HEADER */}
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 mb-1.5">
                  Geospatial Intelligence
                </p>
                <h1 className="text-xl font-bold tracking-tight text-slate-800">
                  Spatial <span className="text-emerald-700">Analysis.</span>
                </h1>
                <p className="text-[11px] text-slate-400 mt-1">
                  Urban Heat Island Monitoring
                </p>
              </div>

              <button
                onClick={() => setOpenPanel(!openPanel)}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 hover:border-emerald-200 transition-all"
              >
                <X size={17} />
              </button>
            </div>

            {renderAnalysisPanel()}

          </div>
        </div>

        {/* SIDEBAR TOGGLE */}
        {!openPanel && (
          <button
            onClick={() => setOpenPanel(true)}
            className="hidden md:flex absolute top-4 left-4 z-[1000] w-10 h-10 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-md text-slate-600 hover:text-emerald-700 hover:border-emerald-200 transition-all"
          >
            <PanelLeft size={18} />
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
          className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-[1001] flex items-center gap-2.5 px-6 py-3 rounded-full bg-emerald-700 text-white text-xs font-bold shadow-xl shadow-emerald-900/20 hover:bg-emerald-800 active:scale-95 transition-all"
        >
          <PanelLeft size={16} />
          Analysis Panel
        </button>

        {/* MOBILE DRAWER */}
        {openMobilePanel && (
          <div className="md:hidden fixed inset-0 z-[1002]">

            <div
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"
              onClick={() => setOpenMobilePanel(false)}
            />

            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] max-h-[90vh] overflow-y-auto shadow-2xl">

              {/* DRAWER HANDLE */}
              <div className="sticky top-0 bg-white z-10 pt-3 pb-4 border-b border-slate-100">
                <div className="w-10 h-1 rounded-full bg-slate-200 mx-auto mb-4"></div>

                <div className="flex items-center justify-between px-6">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-emerald-700">
                      Geospatial Intelligence
                    </p>
                    <h1 className="text-lg font-bold text-slate-800 mt-1">
                      Spatial <span className="text-emerald-700">Analysis.</span>
                    </h1>
                  </div>

                  <button
                    onClick={() => setOpenMobilePanel(false)}
                    className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {renderAnalysisPanel()}
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}
