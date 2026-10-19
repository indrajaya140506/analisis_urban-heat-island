import { useEffect, useState } from "react";

export default function Footer() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      className={`fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t shadow-lg
      transition-all duration-500
      ${show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
    >
      <div className="max-w-7xl mx-auto px-8 py-6">
        
        <div className="grid md:grid-cols-4 gap-6">
          
          {/* Sistem */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Urban Heat Island Analysis
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed text-justify space-y-1">
              Sistem Web GIS untuk menganalisis fenomena Urban Heat Island 
              menggunakan data citra satelit multitemporal guna memantau 
              perubahan suhu permukaan wilayah perkotaan secara interaktif.
            </p>
          </div>

          {/* Teknologi */}
          <div className="md:pl-12">
            <h4 className="font-semibold text-gray-700 mb-2">
              Teknologi
            </h4>
            <ul className="text-sm text-gray-600 ">
              <li>Google Earth Engine</li>
              <li>React JS</li>
              <li>Leaflet JS</li>
              <li>Tailwind CSS</li>
              <li>Laravel</li>
               <li>Flask</li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">
              Kontak
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Email: indrajaya@student.undiksha.ac.id</li>
              <li>Singaraja, Bali</li>
              <li>Web GIS UHI</li>
            </ul>
          </div>

          {/* Institusi */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">
              Institusi
            </h4>
            <p className="text-sm text-gray-600">
              Universitas Pendidikan Ganesha
            </p>
            <p className="text-sm text-gray-600">
              Teknologi Rekayasa Perangkat Lunak
            </p>
            <p className="text-sm text-gray-600">
              Fakultas Teknik dan Kejuruan
            </p>
          </div>

        </div>

        <div className="border-t mt-5 pt-3 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Urban Heat Island Analysis
          </p>

          <p className="text-xs text-gray-500 mt-2 md:mt-0">
            Web GIS for Urban Surface Temperature Monitoring
          </p>
        </div>

      </div>
    </footer>
  );
}