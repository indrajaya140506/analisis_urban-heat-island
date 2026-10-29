
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
      icon: "M12 2C8 2 5 3.5 5 6v12c0 2.5 3 4 7 4s7-1.5 7-4V6c0-2.5-3-4-7-4zm0 2c3 0 5 .9 5 2s-2 2-5 2-5-.9-5-2 2-2 5-2zm0 6c3 0 5 .9 5 2s-2 2-5 2-5-.9-5-2 2-2 5-2z",
    },
    {
      name: "Spatial Analysis",
      path: "/analysis",
      icon: "M4 19h16M4 12h16M4 5h16",
    },
    {
      name: "History",
      path: "/history",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    },
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
        aria-expanded={open}
        className="hidden md:flex fixed top-24 left-6 z-[2000]
        h-11 w-11 items-center justify-center
        rounded-2xl border border-slate-200/70
        bg-white/85 backdrop-blur-2xl
        shadow-[0_8px_30px_rgba(15,23,42,0.08)]
        transition-all duration-300
        hover:border-emerald-300 hover:bg-white
        hover:shadow-[0_8px_25px_rgba(16,185,129,0.13)]
        active:scale-95"
      >
        <div className="flex h-5 w-5 flex-col justify-center gap-[5px]">
          <span className="h-[2px] w-5 rounded-full bg-slate-700 transition-all" />
          <span className="h-[2px] w-4 rounded-full bg-slate-700 transition-all" />
          <span className="h-[2px] w-3 rounded-full bg-emerald-600 transition-all" />
        </div>
      </button>

      {/* SIDEBAR */}
      <aside
        className={`hidden md:flex fixed inset-y-0 left-0
        z-[1500] w-[320px] max-w-[85vw]
        transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div
          className="relative flex h-full w-full flex-col overflow-hidden
          border-r border-white/[0.08]
          bg-[#091710]
          shadow-[24px_0_70px_rgba(0,0,0,0.20)]"
        >
          {/* SUBTLE BACKGROUND DECORATION */}
          <div
            className="pointer-events-none absolute -right-24 top-32
            h-64 w-64 rounded-full bg-emerald-500/[0.07] blur-[90px]"
          />

          <div
            className="pointer-events-none absolute -left-24 bottom-32
            h-52 w-52 rounded-full bg-teal-400/[0.05] blur-[80px]"
          />

          {/* BRAND */}
          <div
            className="relative flex flex-col items-center
            border-b border-white/[0.08]
            bg-white/[0.025] px-6 pb-8 pt-8"
          >
            {/* LOGO */}
            <div
              className="mb-5 flex h-[100px] w-[100px]
              items-center justify-center rounded-[28px]
              border border-white/[0.07]
              bg-white p-3
              shadow-[0_12px_35px_rgba(0,0,0,0.16)]"
            >
              <img
                src={LogoUhi}
                alt="MAPS"
                className="h-full w-full object-contain"
              />
            </div>

            <h2
              className="text-[15px] font-bold
              tracking-[0.28em] text-white"
            >
              UHI MENU
            </h2>

            <div className="my-4 flex items-center gap-2">
              <span className="h-px w-6 bg-emerald-400/30" />
              <span className="h-[5px] w-[5px] rounded-full bg-emerald-400" />
              <span className="h-px w-6 bg-emerald-400/30" />
            </div>

            <p
              className="text-[9px] font-medium
              uppercase tracking-[0.25em] text-slate-400"
            >
              GIS Urban Heat Island
            </p>

            <div
              className="mt-5 inline-flex items-center gap-2
              rounded-full border border-emerald-400/15
              bg-emerald-400/[0.06] px-3 py-1.5"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>

              <span
                className="text-[9px] font-semibold
                uppercase tracking-[0.15em] text-emerald-300"
              >
                Spatial Dashboard
              </span>
            </div>
          </div>

          {/* MENU */}
          <div className="relative flex-1 px-5 py-8">
            <div className="mb-5 flex items-center justify-between px-3">
              <p
                className="text-[10px] font-semibold
                uppercase tracking-[0.24em] text-slate-500"
              >
                Navigation
              </p>

              <span className="text-[10px] font-medium text-slate-600">
                0{menuItems.length}
              </span>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item, index) => (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  aria-current={isActive(item.path) ? "page" : undefined}
                  className={`group relative flex w-full
                  items-center gap-3.5 overflow-hidden
                  rounded-2xl border px-3 py-3
                  text-left transition-all duration-300
                  ${
                    isActive(item.path)
                      ? "border-emerald-400/[0.16] bg-gradient-to-r from-emerald-400/[0.13] to-emerald-400/[0.025] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]"
                      : "border-transparent text-slate-400 hover:border-white/[0.06] hover:bg-white/[0.035] hover:text-white"
                  }`}
                >
                  {/* ACTIVE INDICATOR */}
                  {isActive(item.path) && (
                    <span
                      className="absolute bottom-3 left-0 top-3
                      w-[3px] rounded-r-full bg-emerald-400
                      shadow-[0_0_12px_rgba(52,211,153,0.55)]"
                    />
                  )}

                  {/* ICON */}
                  <span
                    className={`relative flex h-10 w-10 shrink-0
                    items-center justify-center rounded-xl
                    border transition-all duration-300
                    ${
                      isActive(item.path)
                        ? "border-emerald-400/15 bg-emerald-400/[0.10] text-emerald-300"
                        : "border-white/[0.035] bg-white/[0.025] text-slate-500 group-hover:border-emerald-400/10 group-hover:bg-emerald-400/[0.07] group-hover:text-emerald-300"
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
                        strokeWidth={1.7}
                        d={item.icon}
                      />
                    </svg>
                  </span>

                  {/* LABEL */}
                  <span
                    className={`text-[13px] tracking-wide
                    transition-colors duration-300
                    ${
                      isActive(item.path)
                        ? "font-semibold text-white"
                        : "font-medium"
                    }`}
                  >
                    {item.name}
                  </span>

                  {/* ACTIVE INDICATOR DOT */}
                  {isActive(item.path) && (
                    <span
                      className="ml-auto h-1.5 w-1.5
                      rounded-full bg-emerald-400
                      shadow-[0_0_10px_rgba(52,211,153,0.55)]"
                    />
                  )}

                  {/* MENU NUMBER */}
                  {!isActive(item.path) && (
                    <span
                      className="ml-auto text-[9px] font-medium
                      tabular-nums text-slate-600
                      transition-colors group-hover:text-slate-400"
                    >
                      0{index + 1}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            {/* INFO PANEL */}
            <div
              className="mt-9 rounded-2xl border border-white/[0.06]
              bg-white/[0.025] p-4"
            >
              <div className="mb-3 flex items-center gap-2">
                <div
                  className="flex h-7 w-7 items-center justify-center
                  rounded-lg bg-emerald-400/[0.09] text-emerald-300"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.6}
                      d="M12 3v18m9-9H3m15.364-6.364-12.728 12.728m0-12.728 12.728 12.728"
                    />
                  </svg>
                </div>

                <span className="text-[10px] font-semibold tracking-wide text-slate-300">
                  Urban Heat Island
                </span>
              </div>

              <p className="text-[10px] leading-[1.8] text-slate-500">
                Explore spatial patterns and analyze urban temperature
                distribution through GIS.
              </p>

              <div className="mt-4 h-[2px] overflow-hidden rounded-full bg-white/[0.05]">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-emerald-500/70 to-teal-300/60" />
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="relative border-t border-white/[0.07] px-5 py-5">
            <div className="flex items-center gap-3 rounded-2xl p-2">
              <div
                className="flex h-10 w-10 shrink-0
                items-center justify-center rounded-xl
                border border-emerald-300/15
                bg-gradient-to-br from-emerald-400/[0.14] to-teal-400/[0.04]"
              >
                <span
                  className="text-xs font-bold
                  tracking-wider text-emerald-300"
                >
                  IJ
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="text-[11px] font-semibold
                  tracking-[0.15em] text-slate-100"
                >
                  INDRAJYA
                </p>

                <p
                  className="mt-1 text-[9px]
                  uppercase tracking-[0.12em] text-slate-500"
                >
                  Spatial Intelligence
                </p>
              </div>

              <div
                className="flex h-7 w-7 items-center justify-center
                rounded-lg border border-white/[0.06] text-slate-500"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.7}
                    d="M9 18l6-6-6-6"
                  />
                </svg>
              </div>
            </div>

            <div className="mt-4 h-px bg-white/[0.05]" />

            <p
              className="mt-3 text-center text-[9px]
              tracking-[0.12em] text-slate-600"
            >
              GIS · URBAN HEAT ISLAND
            </p>
          </div>
        </div>
      </aside>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[1400]
          hidden bg-slate-950/30
          backdrop-blur-[3px] md:block"
        />
      )}
    </>
  );
}
