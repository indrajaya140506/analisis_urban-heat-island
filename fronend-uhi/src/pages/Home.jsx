import Header from "../components/ui/Header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "../assets/logouhi.png";
import Footer from "../components/ui/Footer";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Home - Sistem Analisis Urban Heat Island";
  }, []);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#FAFBFA] text-slate-900">
      <Header />

      {/* Main Content */}
      <main className="relative flex flex-1 items-center py-14 md:min-h-[calc(100vh-5rem)] md:py-20">

        {/* Subtle Background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute right-[-10%] top-[10%] h-[420px] w-[420px] rounded-full bg-emerald-100/25 blur-[110px]" />
          <div className="absolute bottom-[-10%] left-[-10%] h-[360px] w-[360px] rounded-full bg-teal-100/20 blur-[100px]" />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "radial-gradient(#334155 0.65px, transparent 0.65px)",
              backgroundSize: "25px 25px",
            }}
          />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 sm:px-10 md:grid-cols-[1.05fr_0.95fr] md:gap-8 lg:gap-16 lg:px-12">

          {/* LEFT CONTENT */}
          <section className="order-2 md:order-1">

            {/* Eyebrow */}
            <div className="fade-in mb-7 flex items-center justify-center gap-3 md:justify-start">
              <span className="h-px w-9 bg-emerald-700" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-800 sm:text-[11px]">
                Web GIS · Bali, Indonesia
              </span>
            </div>

            {/* Heading */}
            <h1 className="mb-6 text-center text-[2.15rem] font-semibold leading-[1.16] tracking-[-0.055em] text-[#172923] sm:text-5xl md:text-left md:text-[2.8rem] lg:text-[3.6rem]">
              <span className="reveal reveal-1 block">
                <span className="md:hidden">Sistem Analisis</span>
                <span className="hidden md:block">
                  Selamat Datang di Sistem
                </span>
              </span>

              <span className="reveal reveal-2 mt-3 block bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-600 bg-clip-text pb-1 text-transparent">
                Urban Heat Island Analysis
              </span>
            </h1>

            {/* Description */}
            <p className="fade-in mx-auto mb-9 max-w-[540px] text-center text-[14px] leading-7 text-slate-500 sm:text-base sm:leading-8 md:mx-0 md:text-left md:text-justify">
              <span className="md:hidden">
                Analisis suhu permukaan wilayah perkotaan Provinsi Bali secara interaktif berbasis Web GIS.
              </span>

              <span className="hidden md:inline">
                Sistem Web GIS untuk menganalisis fenomena Urban Heat Island
                secara multitemporal menggunakan data citra satelit. Aplikasi
                ini membantu memantau perubahan suhu permukaan wilayah perkotaan
                khususnya di daerah Bali secara interaktif dan informatif.
              </span>
            </p>

            {/* Actions */}
            <div className="hidden items-center gap-5 md:flex">
              <button
                onClick={() => navigate("/dashboard")}
                className="group inline-flex items-center gap-7 rounded-lg bg-[#176B50] px-6 py-3.5 text-[13px] font-semibold tracking-wide text-white shadow-[0_5px_16px_rgba(23,107,80,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#125940] hover:shadow-[0_10px_25px_rgba(23,107,80,0.18)] active:translate-y-0"
              >
                <span>Go to Maps</span>

                <span className="text-base transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </button>

              <div className="h-10 w-px bg-slate-200" />

              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-semibold uppercase tracking-[0.19em] text-slate-800">
                  Spatial Intelligence
                </span>
                <span className="text-[10px] tracking-wide text-slate-400">
                  Satellite-based Analysis
                </span>
              </div>
            </div>
          </section>

          {/* RIGHT VISUAL */}
          <section className="order-1 flex items-center justify-center md:order-2 md:justify-end">
            <div className="relative flex w-full max-w-[440px] items-center justify-center">

              {/* Ambient Glow */}
              <div className="absolute inset-[15%] rounded-full bg-emerald-200/25 blur-[65px]" />

              {/* Logo Surface */}
              <div className="group relative flex aspect-square w-[230px] items-center justify-center rounded-[2rem] border border-white/90 bg-white/80 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.055)] backdrop-blur-sm transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(15,23,42,0.09)] sm:w-[290px] md:w-[310px] lg:w-[390px]">
                <div className="absolute inset-3 rounded-[1.5rem] border border-slate-100/80" />

                <img
                  src={logo}
                  alt="Urban Heat Island"
                  className="relative z-10 h-full w-full object-contain animate-float"
                />

                {/* Corner Details */}
                <span className="absolute left-5 top-5 h-3 w-3 border-l border-t border-emerald-700/40" />
                <span className="absolute right-5 top-5 h-3 w-3 border-r border-t border-emerald-700/40" />
                <span className="absolute bottom-5 left-5 h-3 w-3 border-b border-l border-emerald-700/40" />
                <span className="absolute bottom-5 right-5 h-3 w-3 border-b border-r border-emerald-700/40" />
              </div>

              {/* Floating Status */}
              <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full border border-slate-200/80 bg-white/95 px-4 py-2.5 shadow-[0_8px_28px_rgba(15,23,42,0.07)] backdrop-blur-md sm:left-auto sm:right-[-8px] sm:translate-x-0 md:right-[-12px] lg:right-[-20px]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                </span>

                <span className="text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-600">
                  Geospatial Analysis
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}