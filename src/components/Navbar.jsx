import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
            <h1 className="sm:text-2xl text-xl font-bold">MKI</h1>
          </div>

          {/* MENU */}
          <ul
            className={`flex lg:gap-12 md:p-0 md:m-0 md:static md:flex-row md:shadow-none md:transition-none md:bg-transparent md:w-auto md:h-full md:translate-y-0 md:text-black gap-8 fixed ${menuActive} top-1/2 -translate-y-1/2 flex-col px-8 py-6 rounded shadow-lg shadow-slate-300 bg-red-600 font-bold text-white transform transition-transform duration-1000 ease-in-out`}
          >
            <li>
              <a href="#" className="font-medium opacity-75">
                Beranda
              </a>
            </li>
            <li>
              <a href="#" className="font-medium opacity-75">
                Produk
              </a>
            </li>
            <li>
              <a href="#" className="font-medium opacity-75">
                Tentang Kami
              </a>
            </li>
            <li>
              <a href="#" className="font-medium opacity-75">
                Course
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
                  className="bg-gray-200 px-4 py-2 rounded-full font-semibold"
                >
                  {user.name}
                </button>

                {openUser && (
                  <div className="absolute right-0 mt-2 bg-white shadow rounded-lg overflow-hidden z-50">
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-sm hover:bg-gray-100 text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

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
