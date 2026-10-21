
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
        className="hidden md:flex fixed top-24 left-6 z-[2000]
        h-11 w-11 items-center justify-center
        rounded-xl border border-slate-200/80
        bg-white/90 backdrop-blur-xl
        shadow-[0_4px_18px_rgba(15,23,42,0.07)]
        transition-all duration-300
        hover:border-emerald-300 hover:shadow-md
        active:scale-95"
      >
        <div className="flex h-5 w-5 flex-col justify-center gap-[5px]">
          <span className="h-[2px] w-5 rounded-full bg-slate-700" />
          <span className="h-[2px] w-4 rounded-full bg-slate-700" />
          <span className="h-[2px] w-3 rounded-full bg-emerald-600" />
        </div>
      </button>

      {/* SIDEBAR */}
      <aside
        className={`hidden md:flex fixed inset-y-0 left-0
        z-[1500] w-[320px] max-w-[85vw]
        transition-transform duration-500 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div
          className="flex h-full w-full flex-col overflow-hidden
          border-r border-white/[0.08]
          bg-[#0B2118]
          shadow-[16px_0_45px_rgba(0,0,0,0.12)]"
        >
          {/* BRAND */}
          <div
            className="relative flex flex-col items-center
            border-b border-slate-200/80
            bg-white px-6 pb-7 pt-8"
          >
            <div
              className="mb-3 flex h-[104px] w-[104px]
              items-center justify-center"
            >
              <img
                src={LogoUhi}
                alt="MAPS"
                className="h-full w-full object-contain"
              />
            </div>

            <h2
              className="text-[15px] font-bold
              tracking-[0.22em] text-slate-800"
            >
              UHI MENU
            </h2>

            <div className="my-3 h-[2px] w-8 rounded-full bg-emerald-600" />

            <p
              className="text-[9px] font-medium
              uppercase tracking-[0.24em] text-slate-500"
            >
              GIS Urban Heat Island
            </p>
          </div>

          {/* MENU */}
          <div className="flex-1 px-5 py-8">
            <div className="mb-5 px-3">
              <p
                className="text-[10px] font-semibold
                uppercase tracking-[0.24em] text-emerald-100/40"
              >
                Navigation
              </p>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`group relative flex w-full
                  items-center gap-3.5 overflow-hidden
                  rounded-xl border px-3 py-3
                  text-left transition-all duration-300
                  ${
                    isActive(item.path)
                      ? "border-emerald-400/15 bg-[#173C2C] text-white"
                      : "border-transparent text-slate-300/70 hover:bg-white/[0.045] hover:text-white"
                  }`}
                >
                  {/* ACTIVE INDICATOR */}
                  {isActive(item.path) && (
                    <span
                      className="absolute bottom-3 left-0 top-3
                      w-[3px] rounded-r-full bg-emerald-400"
                    />
                  )}

                  {/* ICON */}
                  <span
                    className={`flex h-10 w-10 shrink-0
                    items-center justify-center rounded-lg
                    transition-all duration-300
                    ${
                      isActive(item.path)
                        ? "bg-emerald-400/10 text-emerald-300"
                        : "bg-white/[0.035] text-slate-400 group-hover:text-emerald-300"
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
                      rounded-full bg-emerald-400"
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* FOOTER */}
          <div className="border-t border-white/[0.08] px-5 py-5">
            <div className="flex items-center gap-3 px-2 py-1">
              <div
                className="flex h-10 w-10 shrink-0
                items-center justify-center rounded-xl
                border border-emerald-300/15
                bg-emerald-400/10"
              >
                <span
                  className="text-xs font-bold
                  tracking-wider text-emerald-300"
                >
                  IJ
                </span>
              </div>

              <div className="min-w-0">
                <p
                  className="text-[11px] font-semibold
                  tracking-[0.15em] text-white"
                >
                  INDRAJYA
                </p>

                <p
                  className="mt-1 text-[9px]
                  uppercase tracking-[0.12em] text-emerald-100/40"
                >
                  Spatial Intelligence
                </p>
              </div>
            </div>

            <div className="mt-4 h-px bg-white/[0.05]" />

            <p
              className="mt-3 text-center text-[9px]
              tracking-[0.12em] text-slate-500"
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
          className="hidden md:block fixed inset-0
          z-[1400] bg-slate-950/25
          backdrop-blur-[2px]"
        />
      )}
    </>
  );
}
