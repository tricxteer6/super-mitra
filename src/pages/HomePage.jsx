import HeroImage from "/logo.png";
import MapView from "../components/MapView";

function HomePage() {
  return (
    <div className="homepage pb-10">
      <div className="container mx-auto px-4">
        <div className="hero grid md:grid-cols-2 grid-cols-1 gap-20 items-center pt-30">
          <div className="box">
            <h1 className="lg:text-5xl/tight text-3xl font-medium mb-7">
              Selamat Datang di{" "}
              <span className="font-bold text-red-500 underline">
                Master Kuliner Indonesia
              </span>
            </h1>
            <p className="text-base/8 mb-7">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
              dolorem laudantium delectus at eum? Distinctio blanditiis,
              assumenda, doloribus dignissimos sed amet a porro omnis error
              animi minus, delectus labore sunt?
            </p>
            <a
              href="#"
              className="bg-red-600 hover:bg-red-700 transition-all py-2 px-4 text-white shadow rounded-full"
            >
              Tentang Kami<i className="ri-eye-line ms-1"></i>
            </a>
          </div>
          <div className="box">
            <img
              className="md:w-full w-400px mx-auto md:m-0"
              src={HeroImage}
              alt="Hero Image"
            />
          </div>
        </div>
        <div className="about sm:flex md:flex-row sm:justify-between items-center sm:mt-15 sm:mx-20 sm:gap-50">
          <div className="box">
            <h1 className="lg:text-2xl text-center font-bold text-3xl mb-7">Mitra yang sudah bergabung</h1>
            <img src={HeroImage} alt="Daftar Mitra" />
          </div>
          <div className="box">
              <MapView />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
