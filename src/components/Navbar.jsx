import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeroImage from "/logo.png";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [user, setUser] = useState(null);
  const [openUser, setOpenUser] = useState(false);

  const navigate = useNavigate();

  // LOAD USER
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // SCROLL EFFECT
  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY > 5);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all ${
        scroll ? "bg-white shadow" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* LOGO */}
          <Link to="/">
            <img src={HeroImage} alt="Logo" className="w-24" />
          </Link>

          {/* MENU DESKTOP */}
          <nav className="hidden md:flex gap-10 px-10 py-4 rounded-lg">
            <Link to="/" className="font-semibold">
              Beranda
            </Link>
            <Link to="/" className="font-semibold">
              Tentang Kami
            </Link>
            <Link to="/course" className="font-semibold">
              Akses Mitra
            </Link>
          </nav>

          {/* USER / LOGIN */}
          <div className="flex items-center gap-4">
            {!user ? (
              <Link
                to="/login"
                className="bg-red-600 text-white px-6 py-2 rounded-full font-bold"
              >
                Login
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setOpenUser(!openUser)}
                  className={`px-5 py-2 rounded-full font-semibold shadow
                    ${
                      user.role === "admin"
                        ? "bg-purple-600 text-white"
                        : user.role === "vip"
                        ? "bg-yellow-400 text-black"
                        : "bg-gray-200 text-gray-800"
                    }
                  `}
                >
                  {user.nama}
                </button>

                {openUser && (
                  <div className="fixed top-20 right-6 bg-white rounded-lg shadow-lg overflow-hidden z-50 w-48">
                    <div className="px-4 py-3 border-b">
                      <p className="font-semibold">{user.nama}</p>
                      <p className="text-xs uppercase text-gray-500">
                        {user.role}
                      </p>
                    </div>

                    {user.role === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setOpenUser(false)}
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Admin Panel
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* HAMBURGER */}
            <button
              onClick={() => setShow(!show)}
              className="md:hidden text-3xl"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* MENU MOBILE */}
      {show && (
        <div className="md:hidden flex flex-col bg-red-600 text-white px-6 py-6 space-y-4">
          <Link to="/" onClick={() => setShow(false)}>
            Beranda
          </Link>
          <Link to="/about" onClick={() => setShow(false)}>
            Tentang Kami
          </Link>
          <Link to="/course" onClick={() => setShow(false)}>
            Akses Mitra
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
