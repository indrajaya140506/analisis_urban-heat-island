export default function GlobalLoader({
  text = "Processing Spatial Analysis...",
}) {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-md">
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 p-8 shadow-2xl shadow-black/30">

        {/* Background Accent */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative flex flex-col items-center">

          {/* Loading Animation */}
          <div className="relative mb-7 flex h-24 w-24 items-center justify-center">

            <div className="absolute inset-0 rounded-full border border-emerald-400/10" />

            <div className="absolute inset-1 rounded-full border border-dashed border-emerald-400/30 animate-[spin_18s_linear_infinite]" />

            <div className="absolute inset-3 rounded-full border-2 border-transparent border-t-emerald-400 border-r-emerald-400/30 animate-spin" />

            <div className="absolute inset-5 rounded-full border border-cyan-400/30 animate-[spin_3s_linear_infinite_reverse]" />

            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 shadow-lg shadow-emerald-500/10">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6 text-emerald-400"
                aria-hidden="true"
              >
                <path
                  d="M3 6.5L9 3L15 6.5L21 3V17.5L15 21L9 17.5L3 21V6.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 3V17.5M15 6.5V21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="12" cy="11" r="2" fill="currentColor" />
              </svg>
            </div>

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse" />
          </div>

          {/* Loading Text */}
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-400">
              Urban Heat Island
            </p>

            <h3 className="mt-2 text-lg font-semibold tracking-tight text-white">
              Spatial Processing
            </h3>

            <p
              aria-live="polite"
              className="mt-2 text-sm leading-6 text-slate-400"
            >
              {text}
            </p>
          </div>

          {/* Animated Progress Indicator */}
          <div className="mt-7 w-full">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
                Please wait
              </span>

              <span className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Processing
              </span>
            </div>

            <div
              className="h-1 w-full overflow-hidden rounded-full bg-white/5"
              role="progressbar"
              aria-label="Spatial processing in progress"
              aria-valuetext="Loading"
            >
              <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-300 to-cyan-400 animate-[loader_2s_ease-in-out_infinite]" />
            </div>
          </div>

          {/* Footer Label */}
          <div className="mt-6 flex items-center gap-2 text-[10px] tracking-wide text-slate-500">
            <span className="h-px w-6 bg-slate-700" />
            GIS ANALYTICS SYSTEM
            <span className="h-px w-6 bg-slate-700" />
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes loader {
            0% {
              transform: translateX(-110%);
            }
            50% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(260%);
            }
          }
        `}
      </style>
    </div>
  );
}