import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logouhi.png";
import GlobalLoader from "../ui/GlobalLoader";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const navTo = (path) => {
    setLoading(true);
    setIsOpen(false);

    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 700);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {loading && <GlobalLoader text="Loading Mobile GIS..." />}

      <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-[1000] h-20">
        <div className="max-w-7xl mx-auto px-6 h-full">
          <div className="grid grid-cols-2 md:grid-cols-3 items-center h-full">

            {/* LEFT */}
            <div className="flex items-center gap-2 md:gap-4">
              <img 
                src={logo} 
                alt="Logo" 
                className="h-12 w-12 md:h-16 md:w-16 object-contain" 
              />

              <div className="flex flex-col">
                <h1 className="font-black text-gray-900 leading-none tracking-tight">
                  <span className="text-[15px] md:hidden">UHI ANALYST</span>
                  <span className="hidden md:block text-[16px] font-extrabold uppercase">
                    Urban Heat Island Analysis
                  </span>
                </h1>

                <span className="text-[9px] md:text-[10px] text-blue-600 font-bold tracking-[0.1em] md:tracking-[0.2em] mt-1">
                  <span className="md:hidden">BALI</span>
                  <span className="hidden md:block uppercase">
                    UHI PROVINSI BALI
                  </span>
                </span>
              </div>
            </div>

            {/* CENTER */}
           <nav className="hidden md:flex justify-center items-center gap-8 ml-10 text-center">
              <button
                onClick={() => navigate("/")}
                className={`relative py-1 text-[14px] uppercase tracking-widest transition-all duration-300 ${
                  isActive("/")
                    ? "text-gray-900 font-semibold"
                    : "text-gray-400 hover:text-gray-700 font-medium"
                }`}
              >
                Home
                {isActive("/") && (
                  <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gray-900 opacity-70 rounded-full" />
                )}
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className={`relative py-1 text-[14px] uppercase tracking-widest transition-all duration-300 ${
                  isActive("/dashboard")
                    ? "text-gray-900 font-semibold"
                    : "text-gray-400 hover:text-gray-700 font-medium"
                }`}
              >
                Maps
                {isActive("/dashboard") && (
                  <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gray-900 opacity-70 rounded-full" />
                )}
              </button>
              <button
  onClick={() => navigate("/analysis")}
  className={`relative py-1 text-[14px] uppercase tracking-widest transition-all duration-300 ${
    isActive("/analysis")
      ? "text-gray-900 font-semibold"
      : "text-gray-400 hover:text-gray-700 font-medium"
  }`}
>
  Analysis
  {isActive("/analysis") && (
    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gray-900 opacity-70 rounded-full" />
  )}
</button>
<button
  onClick={() => navigate("/history")}
  className={`relative py-1 text-[14px] uppercase tracking-widest transition-all duration-300 ${
    isActive("/history")
      ? "text-gray-900 font-semibold"
      : "text-gray-400 hover:text-gray-700 font-medium"
  }`}
>
  History
  {isActive("/history") && (
    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gray-900 opacity-70 rounded-full" />
  )}
</button>
              
            </nav>

            {/* RIGHT */}
            <div className="flex justify-end items-center gap-6">
              <div className="hidden md:flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                  </span>
                  <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">
                    GIS Analyst
                  </span>
                </div>
              </div>

              {/* Hamburger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors z-[1100]"
              >
                <div className="w-6 flex flex-col items-end gap-1.5">
                  <span className={`h-0.5 bg-gray-800 transition-all duration-300 ${isOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
                  <span className={`h-0.5 bg-gray-800 transition-all duration-300 ${isOpen ? "opacity-0" : "w-4"}`} />
                  <span className={`h-0.5 bg-gray-800 transition-all duration-300 ${isOpen ? "w-6 -rotate-45 -translate-y-2" : "w-2"}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE POPUP */}
<div
  className={`fixed inset-0 h-screen w-screen z-[1050] md:hidden transition-all duration-1000 ${
    isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
  }`}
>
  <div className="absolute inset-0 bg-[#0F2922]/95 backdrop-blur-2xl"></div>

  <div className="relative h-full flex flex-col items-center justify-between py-24">

    {/* LOGO SECTION DENGAN BG PUTIH */}
    <div className="flex flex-col items-center gap-3">
      {/* Container Putih untuk Logo */}
      <div className="bg-white p-4 rounded-2xl shadow-lg mb-2">
        <img
          src={logo}
          alt="UHI"
          className="h-20 w-20 object-contain"
        />
      </div>

      <span className="text-[14px] font-bold tracking-[0.8em] text-[#D2B48C]/50 uppercase">
        Navigation
      </span>

      <div className="w-4 h-[1px] bg-[#D2B48C]/30"></div>
    </div>

    {/* NAVIGATION LINKS */}
    <nav className="flex flex-col gap-10 items-center">
      {[
        { name: "Home", path: "/" },
        { name: "Maps", path: "/dashboard" },
        { name: "Analysis", path: "/analysis" },
        { name: "History", path: "/history" }
      ].map((item) => (
        <button
          key={item.path}
          onClick={() => navTo(item.path)}
          className="group relative flex flex-col items-center"
        >
          <span
            className={`text-2xl tracking-[0.25em] uppercase transition-all duration-700 ${
              isActive(item.path)
                ? "font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent scale-110"
                : "font-light text-white/40 group-hover:text-white/90"
            }`}
          >
            {item.name}
          </span>

          <div
            className={`mt-3 w-1.5 h-1.5 rounded-full transition-all duration-700 bg-emerald-400 ${
              isActive(item.path)
                ? "opacity-100 scale-100 shadow-[0_0_10px_#34d399]"
                : "opacity-0 scale-0"
            }`}
          ></div>
        </button>
      ))}
    </nav>

    {/* FOOTER AREA */}
    <div className="flex flex-col items-center gap-2">
      <div className="px-5 py-1.5 border border-white/5 bg-white/5 rounded-full backdrop-blur-md">
        <p className="text-[9px] text-white/40 font-mono tracking-[0.2em] uppercase">
          Bali • Indonesia
        </p>
      </div>
      <p className="text-[8px] text-[#D2B48C]/30 uppercase tracking-[0.5em] mt-3">
        Indrajaya 2026
      </p>
    </div>

  </div>
</div>
      </header>
    </>
  );
}