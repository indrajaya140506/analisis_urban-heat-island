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

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Maps", path: "/dashboard" },
    { name: "Analysis", path: "/analysis" },
    { name: "History", path: "/history" },
  ];

  return (
    <>
      {loading && <GlobalLoader text="Loading Mobile GIS..." />}

      <header className="sticky top-0 z-[1000] h-20 border-b border-slate-200/70 bg-white/90 shadow-[0_4px_24px_rgba(15,23,42,0.035)] backdrop-blur-xl">
        <div className="mx-auto h-full max-w-7xl px-4 sm:px-6">
          <div className="grid h-full grid-cols-2 items-center md:grid-cols-3">

            {/* LEFT */}
            <div className="flex min-w-0 items-center gap-2.5 md:gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white transition-transform duration-300 hover:scale-[1.04] md:h-14 md:w-14">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="flex min-w-0 flex-col">
                <h1 className="truncate font-black leading-tight tracking-tight text-slate-900">
                  <span className="text-[14px] md:hidden">
                    UHI ANALYST
                  </span>

                  <span className="hidden text-[14px] font-extrabold uppercase tracking-wide lg:block">
                    Urban Heat Island Analysis
                  </span>

                  <span className="hidden text-[13px] font-extrabold uppercase tracking-wide md:block lg:hidden">
                    UHI ANALYST
                  </span>
                </h1>

                <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-700 md:text-[10px] md:tracking-[0.19em]">
                  <span className="md:hidden">BALI</span>
                  <span className="hidden md:inline">
                    UHI PROVINSI BALI
                  </span>
                </span>
              </div>
            </div>

            {/* CENTER */}
            <nav className="ml-4 hidden items-center justify-center gap-1 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-1 md:flex lg:ml-6 lg:gap-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`relative rounded-xl px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.09em] transition-all duration-300 lg:px-4 lg:text-[12px] ${
                    isActive(item.path)
                      ? "bg-white text-emerald-800 shadow-[0_2px_8px_rgba(15,23,42,0.07)] ring-1 ring-slate-200/70"
                      : "text-slate-500 hover:bg-white/80 hover:text-slate-900"
                  }`}
                >
                  {item.name}

                  {isActive(item.path) && (
                    <span className="absolute bottom-1 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-emerald-600" />
                  )}
                </button>
              ))}
            </nav>

            {/* RIGHT */}
            <div className="flex items-center justify-end gap-3 md:gap-5">
              <div className="hidden items-center gap-3 rounded-xl border border-slate-200/70 bg-white px-3.5 py-2 md:flex">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />
                </span>

                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-slate-800">
                    GIS Analyst
                  </span>
                  <span className="text-[8px] font-medium uppercase tracking-wider text-slate-400">
                    Bali, Indonesia
                  </span>
                </div>
              </div>

              {/* HAMBURGER */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={isOpen}
                className="group relative z-[1100] flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-800 shadow-sm transition-all duration-300 hover:border-emerald-200 hover:bg-emerald-50 active:scale-95 md:hidden"
              >
                <div className="flex w-5 flex-col items-end gap-[5px]">
                  <span
                    className={`h-[2px] rounded-full bg-current transition-all duration-300 ${
                      isOpen
                        ? "w-5 translate-y-[7px] rotate-45"
                        : "w-5"
                    }`}
                  />

                  <span
                    className={`h-[2px] rounded-full bg-current transition-all duration-300 ${
                      isOpen ? "w-0 opacity-0" : "w-3.5"
                    }`}
                  />

                  <span
                    className={`h-[2px] rounded-full bg-current transition-all duration-300 ${
                      isOpen
                        ? "w-5 -translate-y-[7px] -rotate-45"
                        : "w-2.5"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE POPUP */}
        <div
          className={`fixed inset-0 z-[1050] h-[100dvh] w-screen overflow-hidden md:hidden ${
            isOpen
              ? "pointer-events-auto visible"
              : "pointer-events-none invisible"
          }`}
        >
          {/* BACKGROUND */}
          <div
            className={`absolute inset-0 bg-[#0B1918]/95 backdrop-blur-2xl transition-opacity duration-500 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* DECORATIVE BACKGROUND */}
          <div className="pointer-events-none absolute -right-28 top-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-teal-400/10 blur-[90px]" />

          <div
            className={`relative flex h-full flex-col items-center justify-between overflow-y-auto px-6 py-24 transition-all duration-500 ease-out ${
              isOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-5 opacity-0"
            }`}
          >
            {/* LOGO SECTION */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/70 bg-white p-4 shadow-[0_12px_45px_rgba(0,0,0,0.2)]">
                <img
                  src={logo}
                  alt="UHI"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="flex flex-col items-center gap-2">
                <span className="text-[12px] font-semibold uppercase tracking-[0.42em] text-white/90">
                  Navigation
                </span>

                <div className="h-[2px] w-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-300" />

                <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.22em] text-white/35">
                  Urban Heat Island Analysis
                </span>
              </div>
            </div>

            {/* NAVIGATION LINKS */}
            <nav className="flex w-full max-w-xs flex-col gap-3">
              {navItems.map((item, index) => (
                <button
                  key={item.path}
                  onClick={() => navTo(item.path)}
                  className={`group relative flex items-center justify-between overflow-hidden rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                    isActive(item.path)
                      ? "border-emerald-400/25 bg-emerald-400/[0.10] shadow-[0_8px_30px_rgba(16,185,129,0.06)]"
                      : "border-white/[0.07] bg-white/[0.025] hover:border-white/15 hover:bg-white/[0.06]"
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${index * 55}ms` : "0ms",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-[10px] font-mono tracking-widest ${
                        isActive(item.path)
                          ? "text-emerald-400"
                          : "text-white/25"
                      }`}
                    >
                      0{index + 1}
                    </span>

                    <span
                      className={`text-[15px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                        isActive(item.path)
                          ? "font-bold text-white"
                          : "font-medium text-white/55 group-hover:text-white"
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>

                  <span
                    className={`text-lg transition-all duration-300 ${
                      isActive(item.path)
                        ? "translate-x-0 text-emerald-400 opacity-100"
                        : "-translate-x-2 text-white/25 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    }`}
                  >
                    →
                  </span>

                  {isActive(item.path) && (
                    <span className="absolute bottom-0 left-5 right-5 h-[1px] bg-gradient-to-r from-emerald-400/70 via-teal-300/40 to-transparent" />
                  )}
                </button>
              ))}
            </nav>

            {/* FOOTER */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />

                <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/55">
                  Bali • Indonesia
                </p>
              </div>

              <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-[#D2B48C]/45">
                Indrajaya 2026
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}