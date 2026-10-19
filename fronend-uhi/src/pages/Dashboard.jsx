import { useState } from "react";
import { analyzeUHI } from "../services/geeService";
import Header from "../components/ui/Header";
import Sidebar from "../components/ui/Sidebar";
import MapView from "../components/map/MapView";

export default function Dashboard() {
  const [chartData, setChartData] = useState([]);
  const [tileUrl, setTileUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (startYear, endYear) => {
    setLoading(true);
    try {
      const res = await analyzeUHI(Number(startYear), Number(endYear));
      setChartData(res?.chart || []);
      setTileUrl(res?.tile || "");
    } catch (err) {
      console.error("Analyze Error:", err);
      alert("Gagal melakukan analisis");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-50">

      {/* ================= MAP (DI TURUNKAN AGAR TIDAK KETUTUP HEADER) ================= */}
      <div className="absolute inset-0 pt-20 w-full h-full">
        <MapView tileUrl={tileUrl} />
      </div>

      {/* ================= HEADER OVERLAY ================= */}
      <div className="absolute top-0 left-0 right-0 z-[1000]">
        <Header />
      </div>

      {/* ================= SIDEBAR ================= */}
      <Sidebar
        onSubmit={handleAnalyze}
        chartData={chartData}
        loading={loading}
      />

     
      

    </div>
  );
}