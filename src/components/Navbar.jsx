import { useEffect, useState } from "react";

const Navbar = () => {
  const [show, setShow] = useState(false)
  const [scroll, setScroll] = useState(false)

  const handleClick = () => {
    setShow(!show);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if(window.scrollY > 5){
        // console.log("TESTING")
        setScroll(true)
        setShow(false)
      } else {
        setScroll(false)
      }
    })
  })

  let scrollActive = scroll ? "py-4 bg-white shadow" : "py-4"

  let menuActive = show ? "right-0" : "-left-full";

  return (
    <div className={`navbar fixed w-full transition-all ${scrollActive}`}>
      <div className="container mx-auto px-4">
        <div className="navbar-box flex items-center justify-between">
          <div className="logo">
            <h1 className="sm:text-2xl text-xl font-bold">MKI</h1>
          </div>
          <ul
            className={`flex lg:gap-12 md:p-0 md:m-0 md:static md:flex-row md:shadow-none md:transition-none md:bg-transparent md:w-auto md:h-full md:translate-y-0 md:text-black gap-8 fixed ${menuActive} top-1/2 -translate-y-1/2 flex-col px-8 py-6 rounded shadow-lg shadow-slate-300 bg-red-600 font-bold text-white transition-all`}
          >
            <li className="flex items-center gap-3">
              <i className="ri-home-2-line text-3xl md:hidden block"></i>
              <a href="#" className="font-medium opacity-75">
                Beranda
              </a>
            </li>
            <li className="flex items-center gap-3">
              <i className="ri-store-2-line text-3xl md:hidden block"></i>
              <a href="#" className="font-medium opacity-75">
                Produk
              </a>
            </li>
            <li className="flex items-center gap-3">
              <i className="ri-information-line text-3xl md:hidden block"></i>
              <a href="#" className="font-medium opacity-75">
                Tentang Kami
              </a>
            </li>
            <li className="flex items-center gap-3">
              <i className="ri-book-read-fill text-3xl md:hidden block"></i>
              <a href="#" className="font-medium opacity-75">
                Course
              </a>
            </li>
          </ul>
          <div className="login flex items-center gap-2">
            <a
              href="/login"
              className="bg-red-600 px-6 py-2 rounded-full text-white font-bold hover:bg-red-700"
            >
              Login
            </a>
            <i
              className="ri-menu-3-line text-3xl md:hidden"
              onClick={handleClick}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
