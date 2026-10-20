import { useEffect, useState } from "react";
import {
  MapPinned,
  Mail,
  MapPin,
  ArrowUpRight,
  Globe2,
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
        border-t border-slate-200/80
        bg-white/95 backdrop-blur-xl
        shadow-[0_-8px_40px_rgba(15,23,42,0.08)]
        transition-all duration-500 ease-out
        ${
          show
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0"
        }
      `}
    >
      <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8 sm:py-6">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Brand */}
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20">
                <MapPinned size={21} strokeWidth={1.8} />
              </div>

              <div>
                <h3 className="text-sm font-bold tracking-tight text-slate-900">
                  Urban Heat Island
                </h3>
                <p className="text-xs font-medium tracking-wide text-blue-600">
                  ANALYSIS
                </p>
              </div>
            </div>

            <p className="max-w-sm text-justify text-xs leading-6 text-slate-500 sm:text-sm">
              Sistem Web GIS untuk menganalisis fenomena Urban Heat Island
              menggunakan citra satelit multitemporal guna memantau perubahan
              suhu permukaan wilayah perkotaan secara interaktif.
            </p>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-900">
              Teknologi
            </h4>

            <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-slate-500 sm:grid-cols-1 sm:text-sm">
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
                  className="flex items-center gap-2 transition-colors duration-200 hover:text-blue-600"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                  {technology}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-900">
              Kontak
            </h4>

            <ul className="space-y-3 text-xs text-slate-500 sm:text-sm">
              <li className="flex items-start gap-2.5">
                <Mail
                  size={16}
                  className="mt-0.5 shrink-0 text-blue-500"
                />
                <a
                  href="mailto:indrajaya@student.undiksha.ac.id"
                  className="break-all transition-colors hover:text-blue-600"
                >
                  indrajaya@student.undiksha.ac.id
                </a>
              </li>

              <li className="flex items-start gap-2.5">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-blue-500"
                />
                <span>Singaraja, Bali, Indonesia</span>
              </li>

              <li className="flex items-start gap-2.5">
                <Globe2
                  size={16}
                  className="mt-0.5 shrink-0 text-blue-500"
                />
                <span>Web GIS UHI</span>
              </li>
            </ul>
          </div>

          {/* Institution */}
          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-900">
              Institusi
            </h4>

            <p className="mb-2 text-sm font-semibold leading-6 text-slate-700">
              Universitas Pendidikan Ganesha
            </p>

            <p className="text-xs leading-6 text-slate-500 sm:text-sm">
              Teknologi Rekayasa Perangkat Lunak
            </p>

            <p className="text-xs leading-6 text-slate-500 sm:text-sm">
              Fakultas Teknik dan Kejuruan
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-[11px] text-slate-400 sm:text-left sm:text-xs">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-slate-600">
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
            className="group flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-500 transition-colors hover:text-blue-600 sm:text-xs"
          >
            Back to top
            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}