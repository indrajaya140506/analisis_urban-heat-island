export default function GlobalLoader({
  text = "Processing Spatial Analysis...",
}) {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-900/20 backdrop-blur-sm">

      {}
      <div className="flex flex-col items-center gap-6">

        {}
        <div className="relative w-20 h-20">

          {}
          <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-xl animate-pulse"></div>

          {}
          <div className="absolute inset-0 border border-emerald-400/30 rounded-full"></div>

          {}
          <div className="absolute inset-0 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>

          {}
          <div className="absolute inset-6 rounded-full bg-emerald-500/30 animate-pulse"></div>

        </div>

        {}
        <div className="text-center">
          <p className="text-[10px] font-bold tracking-[0.35em] text-slate-200 uppercase">
            GEO PROCESSING
          </p>

          <p className="text-xs text-slate-300 mt-2 tracking-wide">
            {text}
          </p>
        </div>

        {}
        <div className="w-40 h-[1px] bg-slate-400/20 overflow-hidden">
          <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-slide"></div>
        </div>

      </div>

      <style>
        {`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        .animate-slide {
          animation: slide 6s ease-in-out infinite;
        }
        `}
      </style>

    </div>
  );
}