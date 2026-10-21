
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LogoUhi from "../../assets/logouhi.png";
import GlobalLoader from "../ui/GlobalLoader";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    setOpen(false);

    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 600);
  };

  return (
    <>
      {/* GLOBAL LOADER */}
      {loading && <GlobalLoader text="Loading GIS Interface..." />}

      {/* MENU BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close sidebar" : "Open sidebar"}
        className="hidden md:flex fixed top-24 left-6 z-[2000]
        h-11 w-11 items-center justify-center
        rounded-xl border border-slate-200/80
        bg-white/90 backdrop-blur-xl
        shadow-[0_4px_20px_rgba(15,23,42,0.08)]
        transition-all duration-300
        hover:border-emerald-200 hover:bg-white
        hover:shadow-[0_8px_24px_rgba(16,185,129,0.12)]
        active:scale-95"
      >
        <div className="flex h-5 w-5 flex-col justify-center gap-[5px]">
          <span
            className={`h-[2px] rounded-full bg-slate-700 transition-all ${
              open ? "w-5" : "w-5"
            }`}
          />
          <span className="h-[2px] w-4 rounded-full bg-slate-700 transition-all" />
          <span className="h-[2px] w-3 rounded-full bg-emerald-600 transition-all" />
        </div>
      </button>

      {/* SIDEBAR */}
      <aside
        className={`hidden md:flex fixed top-0 left-0 h-screen
        w-[320px] max-w-[85vw] z-[1500]
        transition-transform duration-500 ease-in-out
        ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div
          className="flex h-full w-full flex-col overflow-hidden
          border-r border-white/10
          bg-gradient-to-b from-[#103b2b] via-[#0b2b20] to-[#071b14]
          shadow-[12px_0_40px_rgba(0,0,0,0.12)]"
        >
          {/* BRAND */}
          <div
            className="relative flex flex-col items-center
            justify-center overflow-hidden
            border-b border-slate-200/70
            bg-gradient-to-b from-white via-white to-slate-50
            px-6 pb-7 pt-8"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-100/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-teal-100/40 blur-3xl" />

            <div
              className="relative mb-3 flex h-28 w-28 items-center
              justify-center rounded-3xl border border-slate-100
              bg-white shadow-[0_8px_28px_rgba(15,23,42,0.06)]"
            >
              <img
                src={LogoUhi}
                alt="MAPS"
                className="h-24 w-24 object-contain"
              />
            </div>

            <h2 className="relative text-base font-bold tracking-[0.18em] text-slate-800">
              UHI MENU
            </h2>

            <div className="my-3 flex items-center gap-2">
              <span className="h-[2px] w-7 rounded-full bg-emerald-500" />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="h-[2px] w-7 rounded-full bg-emerald-500" />
            </div>

            <p className="relative text-[9px] font-medium uppercase tracking-[0.28em] text-slate-500">
              GIS Urban Heat Island
            </p>
          </div>

          {/* MENU */}
          <div className="flex-1 px-5 py-8">
            <div className="mb-5 flex items-center justify-between px-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-200/50">
                Navigation
              </p>

              <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[9px] font-medium tracking-wider text-emerald-100/50">
                MENU
              </span>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`group relative flex w-full items-center gap-4
                  overflow-hidden rounded-xl border px-4 py-3.5
                  text-left transition-all duration-300
                  ${
                    isActive(item.path)
                      ? "border-emerald-400/20 bg-gradient-to-r from-emerald-400/15 to-emerald-400/[0.04] text-white shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
                      : "border-transparent text-emerald-100/60 hover:border-white/[0.06] hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  {/* ACTIVE INDICATOR */}
                  {isActive(item.path) && (
                    <span className="absolute bottom-3 left-0 top-3 w-[3px] rounded-r-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.45)]" />
                  )}

                  {/* ICON */}
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center
                    justify-center rounded-lg transition-all duration-300
                    ${
                      isActive(item.path)
                        ? "bg-emerald-400/15 text-emerald-300"
                        : "bg-white/[0.04] text-emerald-200/50 group-hover:bg-white/[0.08] group-hover:text-emerald-200"
                    }`}
                  >
                    <svg
                      className="h-[19px] w-[19px]"
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
                  </span>

                  {/* LABEL */}
                  <span
                    className={`text-[13px] tracking-wide transition-colors
                    ${
                      isActive(item.path)
                        ? "font-semibold text-white"
                        : "font-medium"
                    }`}
                  >
                    {item.name}
                  </span>

                  {/* ACTIVE DOT */}
                  {isActive(item.path) && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.5)]" />
                  )}
                </button>
              ))}
            </nav>

            {/* INFORMATION */}
            <div className="mt-10 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-200/80">
                  GIS Workspace
                </p>
              </div>

              <p className="text-[11px] leading-relaxed text-emerald-100/40">
                Urban Heat Island monitoring and spatial analysis interface.
              </p>
            </div>
          </div>

          {/* FOOTER */}
          <div className="border-t border-white/[0.08] bg-black/10 px-5 py-5">
            <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.035] p-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center
                justify-center rounded-xl border border-emerald-300/20
                bg-gradient-to-br from-emerald-400 to-emerald-700
                shadow-[0_4px_12px_rgba(16,185,129,0.15)]"
              >
                <span className="text-xs font-bold tracking-wide text-white">
                  IJ
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-bold tracking-[0.12em] text-white">
                  INDRAJYA
                </p>

                <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-emerald-300/60">
                  Urban Heat Island
                </p>
              </div>

              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </div>

            <p className="mt-3 text-center text-[9px] tracking-wider text-emerald-100/25">
              GIS • SPATIAL INTELLIGENCE
            </p>
          </div>
        </div>
      </aside>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="hidden md:block fixed inset-0
          z-[1400] bg-slate-950/30 backdrop-blur-[3px]
          transition-opacity duration-300"
        />
      )}
    </>
  );
}
