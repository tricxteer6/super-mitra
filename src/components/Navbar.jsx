import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeroImage from "/logo.png";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [user, setUser] = useState(null);
  const [openUser, setOpenUser] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setShow(!show);
  };

  // ===== CEK LOGIN =====
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ===== SCROLL EFFECT =====
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 5) {
        setScroll(true);
        setShow(false);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  let scrollActive = scroll ? "py-4 bg-white shadow" : "py-4";
  let menuActive = show ? "right-0 h-full mt-18" : "-left-full";

  return (
    <div className={`navbar fixed w-full transition-all ${scrollActive} z-50`}>
      <div className="container mx-auto px-4">
        <div className="navbar-box flex items-center justify-between">
          <div className="logo">
            <img src={HeroImage} alt="Logo" className="w-20 h-auto" />
          </div>

          {/* MENU */}
          <ul
            className={`flex lg:gap-12 md:mt-5 md:p-0 md:m-0 md:static md:flex-row 
  md:shadow-none md:bg-transparent md:opacity-100 md:scale-100
  md:translate-x-0 md:pointer-events-auto md:text-black
  gap-8 fixed top-1/2 -translate-y-1/2 flex-col px-8 py-6 
  shadow-lg shadow-slate-300 bg-red-600 font-bold text-white
  transition-all duration-500 ease-in-out transform
  ${menuActive}`}
          >
            <li>
              <a
                href="/"
                onClick={() => setShow(false)}
                className="font-medium opacity-75"
              >
                Beranda
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => setShow(false)}
                className="font-medium opacity-75"
              >
                Produk
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => setShow(false)}
                className="font-medium opacity-75"
              >
                Tentang Kami
              </a>
            </li>
            <li>
              <a
                href="/course"
                onClick={() => setShow(false)}
                className="font-medium opacity-75"
              >
                Akses Mitra
              </a>
            </li>
          </ul>

          {/* LOGIN / USER */}
          <div className="login flex items-center gap-2">
            {!user ? (
              // ===== BELUM LOGIN =====
              <Link
                to="/login"
                className="bg-red-600 px-6 py-2 rounded-full text-white font-bold hover:bg-red-700"
              >
                Login
              </Link>
            ) : (
              // ===== SUDAH LOGIN =====
              <div className="relative">
                <button
                  onClick={() => setOpenUser(!openUser)}
                  className={`px-4 py-2 rounded-full font-semibold transition hover:cursor-pointer
                    ${
                      user.role === "vip"
                        ? "bg-linear-to-r from-yellow-400 to-yellow-500 text-black shadow"
                        : user.role === "admin"
                        ? "bg-purple-600 text-white shadow"
                        : "bg-gray-200 text-gray-800"
                    }
                  `}
                >
                  {user.name}
                </button>

                {openUser && (
                  <div className="absolute right-0 mt-2 bg-white shadow rounded-lg overflow-hidden z-50">
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-sm hover:bg-gray-100 text-left hover:cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            <i
              className={`text-3xl md:hidden transition-transform duration-300
    ${show ? "ri-close-line rotate-180" : "ri-menu-3-line"}
  `}
              onClick={handleClick}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
