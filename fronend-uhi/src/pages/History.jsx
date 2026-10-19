import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/ui/Header";
import Sidebar from "../components/ui/Sidebar";


export default function History() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [successDelete, setSuccessDelete] = useState(false);

   useEffect(() => {
    document.title = "History - Sistem Analisis Urban Heat Island";
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/uhi");
      setData(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/uhi/${deleteId}`);
      setData((prev) => prev.filter((d) => d.analysis_id !== deleteId));

      setSuccessDelete(true);
      setTimeout(() => {
        setSuccessDelete(false);
      }, 2000);

    } catch (err) {
      console.error(err);
    } finally {
      setDeleteId(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const grouped = data.reduce((acc, item) => {
    if (!acc[item.analysis_id]) acc[item.analysis_id] = [];
    acc[item.analysis_id].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />
      <Sidebar />

      <main className="pt-10 pb-20 px-2 md:px-8 max-w-7xl mx-auto space-y-10">

        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex flex-col items-center md:items-start w-full md:w-auto">
            <div className="flex items-center justify-center md:justify-start gap-3 w-full">
              <div className="hidden md:block h-8 w-1.5 bg-emerald-500 rounded-full"></div>

              <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-800 uppercase">
                Analysis
                <span className="ml-2 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent font-extrabold">
                  History
                </span>
              </h1>
            </div>

            <p className="text-slate-400 font-medium text-xs md:text-sm mt-2 text-center md:text-left md:ml-5 tracking-wide">
              Spatial computation records & LST analysis history
            </p>
          </div>

          <div className="bg-white px-4 py-3 rounded-2xl 
shadow-sm 
border border-slate-900 
flex flex-col items-center md:items-end 
min-w-[120px] self-center md:self-auto">

  <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest text-center w-full">
  Total Groups
</span>

 <span className="text-2xl font-bold text-slate-900 text-center w-full">
  {Object.keys(grouped).length}
</span>

</div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex flex-col items-center py-40">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin"></div>
            <p className="text-[10px] mt-4 tracking-[0.3em] uppercase text-slate-400 font-bold">
              Syncing Data...
            </p>
          </div>
        )}

        {/* EMPTY */}
        {!loading && data.length === 0 && (
          <div className="py-40 text-center bg-white/60 backdrop-blur-xl border border-dashed border-slate-200 rounded-[2.5rem]">
            <p className="text-slate-400 font-bold tracking-widest uppercase text-sm">
              No Analysis History Found
            </p>
          </div>
        )}

        {/* GRID HISTORY */}
        <div className="space-y-10">
          {Object.entries(grouped).map(([analysisId, items]) => (
            <div
              key={analysisId}
              className="bg-white/70 backdrop-blur-xl border border-slate-900/30 shadow-[0_20px_60px_rgba(0,0,0,0.05)] rounded-[2.5rem] overflow-hidden hover:shadow-[0_25px_70px_rgba(0,0,0,0.08)] transition-all duration-500"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-slate-900/20">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Analysis Group
                    </p>
                    <p className="text-sm font-black text-slate-800">
                      {analysisId}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setDeleteId(analysisId)}
                  className="group w-10 h-10 rounded-xl border border-red-100 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  🗑
                </button>
              </div>

              {/* GRID */}
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white border border-slate-900/20 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Year
                      </span>

                      <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600">
                        {item.year}
                      </span>
                    </div>

                    <div className="mb-4">
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">
                        LST Value
                      </p>
                      <p className="text-2xl font-black text-emerald-600">
                        {item.lst}
                        <span className="text-xs text-slate-400 ml-1">°C</span>
                      </p>
                    </div>

                    <div className="mb-2">
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                        Region
                      </p>
                      <p className="text-xs font-semibold text-slate-600 italic">
                        {item.region}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span className="text-sm font-semibold text-slate-700">
                        {item.region_name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setDeleteId(null)}
          />

          <div className="relative bg-white w-[90%] max-w-md rounded-3xl shadow-2xl p-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-4">
              <span className="text-2xl">🗑</span>
            </div>

            <h2 className="text-xl font-bold text-center text-slate-800 mb-2">
              Delete History?
            </h2>

            <p className="text-sm text-slate-500 text-center mb-6">
              This action cannot be undone.  
              Are you sure you want to delete this history group?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-red-600 transition shadow-lg shadow-red-500/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS DELETE POPUP */}
      {successDelete && (
        <div className="fixed top-6 right-6 z-[9999]">
          <div className="bg-white border border-emerald-500 shadow-lg rounded-2xl px-5 py-3 flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs">
              ✓
            </div>
            <span className="text-sm font-semibold text-slate-700">
              History successfully deleted
            </span>
          </div>
        </div>
      )}

    </div>
  );
}