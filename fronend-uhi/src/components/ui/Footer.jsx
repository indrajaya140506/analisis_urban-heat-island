
import { useEffect, useState } from "react";
import {
  MapPinned,
  Mail,
  MapPin,
  ArrowUpRight,
  Globe2,
  ArrowUp,
} from "lucide-react";

export default function Footer() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      className={`
        fixed bottom-0 left-0 z-40 w-full
        border-t border-white/[0.08]
        bg-[#091710]/[0.97] text-slate-300
        backdrop-blur-2xl
        shadow-[0_-12px_50px_rgba(0,0,0,0.20)]
        transition-all duration-500 ease-out
        ${
          show
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0"
        }
      `}
    >
      {/* Subtle emerald glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8 sm:py-6">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex h-11 w-11 shrink-0 items-center
                justify-center rounded-2xl
                border border-emerald-300/15
                bg-gradient-to-br from-emerald-400/[0.15] to-teal-400/[0.04]
                text-emerald-300
                shadow-[0_5px_20px_rgba(16,185,129,0.06)]"
              >
                <MapPinned size={21} strokeWidth={1.7} />
              </div>

              <div>
                <h3 className="text-sm font-bold tracking-tight text-white">
                  Urban Heat Island
                </h3>

                <p className="mt-1 text-[9px] font-semibold tracking-[0.24em] text-emerald-400">
                  ANALYSIS
                </p>
              </div>
            </div>

            <p className="max-w-sm text-justify text-xs leading-6 text-slate-400 sm:text-sm">
              Sistem Web GIS untuk menganalisis fenomena Urban Heat Island
              menggunakan citra satelit multitemporal guna memantau perubahan
              suhu permukaan wilayah perkotaan secara interaktif.
            </p>

            <div
              className="mt-4 inline-flex items-center gap-2
              rounded-full border border-emerald-400/15
              bg-emerald-400/[0.05] px-3 py-1.5"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>

              <span className="text-[9px] font-medium tracking-[0.12em] text-emerald-300">
                SPATIAL INTELLIGENCE
              </span>
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white">
              <span className="h-4 w-[2px] rounded-full bg-emerald-400" />
              Teknologi
            </h4>

            <ul className="grid grid-cols-2 gap-x-3 gap-y-3 text-xs text-slate-400 sm:grid-cols-1 sm:text-sm">
              {[
                "Google Earth Engine",
                "React JS",
                "Leaflet JS",
                "Tailwind CSS",
                "Laravel",
                "Flask",
              ].map((technology) => (
                <li
                  key={technology}
                  className="group flex items-center gap-2.5 transition-colors duration-200 hover:text-emerald-300"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full
                    bg-emerald-400/50 transition-all duration-200
                    group-hover:bg-emerald-300
                    group-hover:shadow-[0_0_8px_rgba(52,211,153,0.45)]"
                  />
                  {technology}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white">
              <span className="h-4 w-[2px] rounded-full bg-emerald-400" />
              Kontak
            </h4>

            <ul className="space-y-4 text-xs text-slate-400 sm:text-sm">
              <li className="flex items-start gap-3">
                <div
                  className="flex h-8 w-8 shrink-0 items-center
                  justify-center rounded-xl border border-white/[0.06]
                  bg-white/[0.025] text-emerald-300"
                >
                  <Mail size={15} strokeWidth={1.7} />
                </div>

                <a
                  href="mailto:indrajaya@student.undiksha.ac.id"
                  className="mt-1.5 break-all transition-colors duration-200 hover:text-emerald-300"
                >
                  indrajaya@student.undiksha.ac.id
                </a>
              </li>

              <li className="flex items-start gap-3">
                <div
                  className="flex h-8 w-8 shrink-0 items-center
                  justify-center rounded-xl border border-white/[0.06]
                  bg-white/[0.025] text-emerald-300"
                >
                  <MapPin size={15} strokeWidth={1.7} />
                </div>

                <span className="mt-1.5">Singaraja, Bali, Indonesia</span>
              </li>

              <li className="flex items-start gap-3">
                <div
                  className="flex h-8 w-8 shrink-0 items-center
                  justify-center rounded-xl border border-white/[0.06]
                  bg-white/[0.025] text-emerald-300"
                >
                  <Globe2 size={15} strokeWidth={1.7} />
                </div>

                <span className="mt-1.5">Web GIS UHI</span>
              </li>
            </ul>
          </div>

          {/* Institution */}
          <div>
            <h4 className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white">
              <span className="h-4 w-[2px] rounded-full bg-emerald-400" />
              Institusi
            </h4>

            <div
              className="rounded-2xl border border-white/[0.06]
              bg-white/[0.025] p-4"
            >
              <p className="text-sm font-semibold leading-6 text-slate-100">
                Universitas Pendidikan Ganesha
              </p>

              <div className="my-3 h-px bg-white/[0.07]" />

              <p className="text-xs leading-6 text-slate-400">
                Teknologi Rekayasa Perangkat Lunak
              </p>

              <p className="text-xs leading-6 text-slate-500">
                Fakultas Teknik dan Kejuruan
              </p>

              <div className="mt-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
                <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500">
                  Academic Project
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-6 flex flex-col gap-3
          border-t border-white/[0.08] pt-4
          sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-center text-[10px] leading-5 text-slate-500 sm:text-left sm:text-xs">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-slate-300">
              Urban Heat Island Analysis
            </span>
            . All rights reserved.
          </p>

          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group inline-flex items-center justify-center gap-2
            self-center rounded-xl border border-white/[0.07]
            bg-white/[0.025] px-3.5 py-2
            text-[10px] font-medium tracking-wide text-slate-400
            transition-all duration-300
            hover:border-emerald-400/20
            hover:bg-emerald-400/[0.06]
            hover:text-emerald-300
            sm:self-auto sm:text-xs"
          >
            <ArrowUp size={14} strokeWidth={1.8} />

            Back to top

            <ArrowUpRight
              size={13}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
