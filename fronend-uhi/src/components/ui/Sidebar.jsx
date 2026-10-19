import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LogoUhi from "../../assets/logouhi.png";
import GlobalLoader from "../ui/GlobalLoader"; // ← TAMBAH

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // ← TAMBAH

  const isActive = (path) => location.pathname === path;

  // ================= MENU =================
  const menuItems = [
    {
      name: "Maps",
      path: "/dashboard",
      icon: "M12 2C8 2 5 3.5 5 6v12c0 2.5 3 4 7 4s7-1.5 7-4V6c0-2.5-3-4-7-4zm0 2c3 0 5 .9 5 2s-2 2-5 2-5-.9-5-2 2-2 5-2zm0 6c3 0 5 .9 5 2s-2 2-5 2-5-.9-5-2 2-2 5-2z"
    },
    {
      name: "Spatial Analysis",
      path: "/analysis",
      icon: "M4 19h16M4 12h16M4 5h16"
    },
    {
      name: "History",
      path: "/history",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    }
  ];

  const handleNav = (path) => {
    setLoading(true); // ← SHOW LOADER
    setOpen(false);

    setTimeout(() => {
      navigate(path);
      setLoading(false); // ← HIDE LOADER
    }, 600); // delay smooth
  };

  return (
    <>
      {/* GLOBAL LOADER */}
      {loading && <GlobalLoader text="Loading GIS Interface..." />}

      {/* MENU BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="hidden md:flex fixed top-24 left-6 z-[2000] 
        bg-white/80 backdrop-blur-md border border-slate-100 
        shadow-sm rounded-xl p-2 hover:bg-white transition"
      >
        <div className="w-5 h-5 flex flex-col justify-center gap-1">
          <span className="h-[2px] w-5 bg-slate-800 rounded-full"></span>
          <span className="h-[2px] w-4 bg-slate-800 rounded-full"></span>
          <span className="h-[2px] w-3 bg-slate-800 rounded-full"></span>
        </div>
      </button>

      {/* SIDEBAR */}
      <aside
        className={`hidden md:flex fixed top-0 left-0 h-screen w-[520px] z-[1500]
        transition-transform duration-500 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-full flex flex-col bg-gradient-to-b from-[#0f3a28] via-[#0b2b1f] to-[#081c14]">

         {/* BRAND */}
<div className="flex flex-col items-center justify-center pt-8 pb-8 px-8 bg-white">
  <img
    src={LogoUhi}
    alt="MAPS"
    className="h-44 w-44 object-contain mb-1"
  />

  <h2 className="text-[17px] font-semibold tracking-wide text-slate-900">
    UHI MENU
  </h2>

  <div className="w-12 h-[2px] bg-emerald-500/80 rounded-full my-2"></div>

  <p className="text-[9px] text-slate-500 tracking-[0.4em] uppercase">
    GIS Urban Heat Island
  </p>
</div>
          {/* MENU */}
          <div className="flex-1 px-10 py-10">
            <p className="text-[10px] text-emerald-200/50 tracking-[0.4em] uppercase mb-8">
              Navigation
            </p>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300
                  ${
                    isActive(item.path)
                      ? "bg-white/10 text-white"
                      : "text-emerald-100/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <svg
                    className={`h-5 w-5 transition-colors duration-300 ${
                      isActive(item.path)
                        ? "text-emerald-300"
                        : "text-emerald-200/40"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d={item.icon}
                    />
                  </svg>

                  <span
                    className={`text-[14px] tracking-wide ${
                      isActive(item.path)
                        ? "font-semibold text-white"
                        : "font-medium"
                    }`}
                  >
                    {item.name}
                  </span>

                  {isActive(item.path) && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-300"></span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* FOOTER */}
          <div className="bg-[#061711] border-t border-white/10 px-10 py-6 flex items-center gap-3">
            <div className="h-9 w-9 rounded-md bg-emerald-500/90 flex items-center justify-center">
              <span className="text-white text-sm font-bold">IJ</span>
            </div>

            <div>
              <p className="text-[12px] font-semibold text-white uppercase">
                INDRAJYA
              </p>
              <p className="text-[10px] text-emerald-300/60 uppercase tracking-widest">
                Urban Heat Island
              </p>
            </div>
          </div>

        </div>
      </aside>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="hidden md:block fixed inset-0 bg-black/25 backdrop-blur-sm z-[1400]"
        />
      )}
    </>
  );
}