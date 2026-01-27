import HeroImage from "/logo.png";
import MapView from "../components/MapView";

function HomePage() {
  
  return (
    <div className="homepage pb-16">
      <div className="container mx-auto px-4">
        {/* HERO */}
        <div className="hero grid md:grid-cols-2 gap-20 items-center pt-32 sm:pt-50">
          <div>
            <h1 className="lg:text-5xl text-3xl font-medium mb-7">
              Selamat Datang di{" "}
              <span className="font-bold text-5xl text-red-500 underline">
                Super Mitra Master Kuliner Indonesia
              </span>
            </h1>

            <p className="text-base leading-8 mb-7">
              temukan ribuan mitra master kuliner indonesia dari berbagai daerah
              di seluruh indonesia melalui peta interaktif kami.
            </p>

            <button className="bg-red-600 hover:bg-red-700 transition-all py-2 px-5 text-white shadow rounded-full">
              Tentang Kami
            </button>
          </div>

          <div>
            <img
              className="md:w-full max-w-80 mx-auto"
              src={HeroImage}
              alt="Hero"
            />
          </div>
        </div>

        {/* MAP SECTION */}
        <section className="mt-24 pt-12 relative z-0">
          <div className="text-center max-w-2xl sm:mx-auto mb-10">
            <h2 className="text-4xl font-semibold mb-4">
              Jelajahi Mitra Kuliner Kami
            </h2>
            <p className="text-base leading-8 text-gray-600">
              Cari mitra berdasarkan kota, provinsi, atau kategori brand. Klik
              marker untuk melihat detail mitra.
            </p>
          </div>
          <MapView />
        </section>
      </div>
    </div>
  );
}

export default HomePage;
