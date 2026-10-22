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
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#FCFDFD] text-slate-900">
      <Header />

      {/* Main Content */}
      <main className="relative flex flex-1 items-center py-12 md:min-h-[calc(100vh-5rem)] md:py-20">
        {/* Background Decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-emerald-100/40 blur-[100px]" />
          <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-teal-100/40 blur-[100px]" />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "radial-gradient(#0f766e 0.7px, transparent 0.7px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 sm:px-8 md:grid-cols-2 md:gap-10 lg:gap-16 lg:px-12">

          {/* Logo Section */}
          <div className="order-1 flex justify-center md:order-2 md:justify-end">
            <div className="relative flex items-center justify-center">
              {/* Soft Glow */}
              <div className="absolute inset-8 rounded-full bg-emerald-300/20 blur-3xl" />

              {/* Logo Container */}
              <div className="relative flex h-[240px] w-[240px] items-center justify-center rounded-[2rem] border border-white/80 bg-white/75 p-5 shadow-[0_20px_70px_rgba(15,23,42,0.07)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,118,110,0.12)] sm:h-[300px] sm:w-[300px] md:h-[340px] md:w-[340px] lg:h-[410px] lg:w-[410px]">
                <img
                  src={logo}
                  alt="Urban Heat Island"
                  className="h-full w-full object-contain animate-float"
                />
              </div>

              {/* Decorative Accent */}
              <div className="absolute -bottom-4 -left-4 hidden h-20 w-20 rounded-2xl border border-emerald-200/70 bg-white/60 backdrop-blur-md md:block" />

              <div className="absolute -right-3 -top-3 hidden h-12 w-12 items-center justify-center rounded-2xl border border-white bg-emerald-50 shadow-sm md:flex">
                <span className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_14px_rgba(16,185,129,0.4)]" />
              </div>
            </div>
          </div>

          {/* Left Content */}
          <div className="order-2 text-center md:order-1 md:pr-2 md:text-left lg:pr-6">

            {/* Eyebrow */}
            <div className="fade-in mb-6 flex items-center justify-center gap-3 md:justify-start">
              <span className="h-[2px] w-8 rounded-full bg-emerald-600" />

              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-700 sm:text-[11px]">
                Web GIS • Bali, Indonesia
              </span>
            </div>

            {/* Heading */}
            <h1 className="mb-6 text-[2rem] font-extrabold leading-[1.2] tracking-tight text-slate-900 sm:text-4xl md:text-[2.65rem] lg:text-5xl lg:leading-[1.15]">
              <span className="reveal reveal-1 block">
                <span className="md:hidden">Sistem Analisis</span>
                <span className="hidden md:block">
                  Selamat Datang di Sistem
                </span>
              </span>

              <span className="reveal reveal-2 mt-2 block bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-500 bg-clip-text pb-1 text-transparent">
                Urban Heat Island Analysis
              </span>
            </h1>

            {/* Description */}
            <p className="fade-in mx-auto mb-8 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 md:mx-0 md:text-justify lg:text-[16px]">
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

            {/* Desktop Button */}
            <div className="hidden md:flex md:items-center md:gap-5">
              <button
                onClick={() => navigate("/dashboard")}
                className="group inline-flex items-center gap-4 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(5,150,105,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:from-emerald-800 hover:to-teal-700 hover:shadow-[0_12px_30px_rgba(5,150,105,0.25)] active:translate-y-0"
              >
                <span>Go to Maps</span>

                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>

              <div className="flex flex-col border-l border-slate-200 pl-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-800">
                  Spatial Analysis
                </span>

                <span className="mt-1 text-[10px] text-slate-400">
                  Multitemporal Satellite Data
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}