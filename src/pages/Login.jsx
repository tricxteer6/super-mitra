import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE - 70% */}
      <div className="hidden md:flex w-[70%] relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f)",
          }}
        />

        {/* Blur Overlay */}
        <div className="absolute inset-0 backdrop-blur-md bg-black/40" />

        {/* Logo & Text */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white w-full">
          <img src="" alt="Logo" className="w-24 mb-4" />
          <h1 className="text-4xl font-bold">Master Kuliner Indonesia</h1>
          <p className="mt-2 text-lg opacity-80">Your partner solution.</p>
        </div>
      </div>

      {/* RIGHT SIDE - 30% */}
      <div className="w-full md:w-[30%] flex items-center justify-center bg-gray-100">
        <div className="p-8 rounded-xl w-[90%] max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="********"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={() => navigate('/')}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            © 2025 Master Kuliner Indonesia
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
