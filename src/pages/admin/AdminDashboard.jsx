import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="pt-28 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Kelola user dan konten course dari satu tempat
          </p>
        </div>

        {/* GRID MENU */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* USER CARD */}
          <Link
            to="/admin/users"
            className="group bg-white p-6 shadow hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center bg-blue-100 text-blue-600 text-2xl">
                👥
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">
                  Kelola User
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Tambah, hapus, dan atur role user
                </p>
              </div>
            </div>
          </Link>

          {/* COURSE CARD */}
          <Link
            to="/admin/courses"
            className="group bg-white  p-6 shadow hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center bg-green-100 text-green-600 text-2xl">
                🎥
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-green-600">
                  Kelola Course
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Atur video, konten VIP, dan publik
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* FOOTER INFO */}
        <div className="mt-10 text-sm text-gray-400">
          © {new Date().getFullYear()} Admin Panel • Supermitra
        </div>
      </div>
    </div>
  );
}
