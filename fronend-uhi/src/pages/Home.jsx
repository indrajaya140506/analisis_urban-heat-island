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
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Header />

      {/* Content */}
      <main className="flex-1 flex items-center min-h-[80vh] md:min-h-[120vh] py-10 md:pb-32">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Logo Section */}
          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <img
              src={logo}
              alt="Urban Heat Island"
              className="w-[220px] h-[220px] md:w-[380px] md:h-[380px] object-contain animate-float"
            />
          </div>

          {/* Left Content */}
          <div className="md:pr-4 order-2 md:order-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-4">
              <span className="reveal reveal-1 block">
                <span className="md:hidden">Sistem Analisis</span>
                <span className="hidden md:block">Selamat Datang di Sistem</span>
              </span>

              <span className="reveal reveal-2 block text-emerald-600">
                Urban Heat Island Analysis
              </span>
            </h1>

            {/* Deskripsi Singkat */}
            <p className="fade-in text-gray-600 text-base md:text-lg leading-relaxed mb-8 text-center md:text-justify">
              <span className="md:hidden">
                Analisis suhu permukaan wilayah perkotaan Provinsi Bali secara interaktif berbasis Web GIS.
              </span>
              <span className="hidden md:block">
                Sistem Web GIS untuk menganalisis fenomena Urban Heat Island 
                secara multitemporal menggunakan data citra satelit. 
                Aplikasi ini membantu memantau perubahan suhu permukaan 
                wilayah perkotaan khususnya di daerah Bali secara interaktif dan informatif.
              </span>
            </p>

            {/* Tombol: Hanya muncul di Desktop */}
            <div className="hidden md:block">
              <button
                onClick={() => navigate("/dashboard")}
                className="px-10 py-3 rounded-xl text-white font-semibold 
                           bg-gradient-to-r from-emerald-600 to-teal-500
                           shadow-md hover:shadow-lg
                           hover:from-emerald-700 hover:to-teal-600
                           transition-all duration-300"
              >
               Go to Maps
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}