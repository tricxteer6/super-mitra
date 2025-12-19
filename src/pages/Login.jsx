import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataUser from "../database/DataUser";
import HeroImage from "/logo.png";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = DataUser.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Email atau password salah");
      return;
    }

    // simpan user login
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-[70%] relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f)",
          }}
        />
        <div className="absolute inset-0 backdrop-blur-md bg-black/40" />
        <div className="relative z-10 flex flex-col justify-center items-center text-white w-full">
          <img
            src={HeroImage}
            alt="Logo"
            className="w-60 mb-4 drop-shadow-[0_0_1px_white] drop-shadow-[0_0_2px_white]"
          />
          <h1 className="text-4xl font-bold">Master Kuliner Indonesia</h1>
          <p className="mt-2 text-lg opacity-80">Your partner solution.</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-[30%] flex items-center justify-center bg-gray-100">
        <div className="p-8 rounded-xl w-[90%] max-w-sm bg-white shadow">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-sm text-gray-600 hover:text-blue-600 underline hover:cursor-pointer"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
