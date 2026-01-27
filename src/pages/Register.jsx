import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import MapPicker from "../components/MapPicker";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
    alamat: "",
    kelurahan: "",
    kecamatan: "",
    kota: "",
    provinsi: "",
    kode_pos: "",
    kemitraan: "DCC",
    role: "user",
    lat: null,
    lng: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Password dan konfirmasi password tidak sama");
      return;
    }

    if (!formData.lat || !formData.lng) {
      setError("Silakan pilih lokasi di map");
      return;
    }

    try {
      setLoading(true);
      await api.post("/admin/register", formData);
      setSuccess("User berhasil didaftarkan");

      setTimeout(() => {
        navigate("/admin/users");
      }, 800);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal register user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Registrasi User Baru</h2>

          <button
            onClick={() => navigate("/admin/users")}
            className="text-sm text-gray-600 hover:text-blue-600 underline"
          >
            ← Kembali
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded bg-red-100 px-4 py-2 text-red-700 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded bg-green-100 px-4 py-2 text-green-700 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ===== ROW 1 ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Nama</label>
              <input
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-2 mt-1"
                placeholder="Nama lengkap"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-2 mt-1"
                placeholder="email@example.com"
              />
            </div>
          </div>

          {/* ===== ROW 2 ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Konfirmasi Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-2 mt-1"
              />
            </div>
          </div>

          {/* ===== ALAMAT ===== */}
          <div>
            <label className="text-sm font-medium">Alamat</label>
            <input
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2 mt-1"
            />
          </div>

          {/* ===== WILAYAH ===== */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["kelurahan", "kecamatan", "kota", "provinsi"].map((field) => (
              <div key={field}>
                <label className="text-xs font-medium capitalize">
                  {field}
                </label>
                <input
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-3 py-2 mt-1 text-sm"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Kode Pos</label>
              <input
                name="kode_pos"
                value={formData.kode_pos}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-2 mt-1"
              >
                <option value="user">User</option>
                <option value="vip">VIP</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Kemitraan</label>
              <select
                name="kemitraan"
                value={formData.kemitraan}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-2 mt-1"
              >
                <option value="DCC">DCC</option>
                <option value="DCC-XTRA">DCC-XTRA</option>
                <option value="DBDS">DBDS</option>
                <option value="DCBK">DCBK</option>
                <option value="CCR">CCR</option>
                <option value="DCCC">DCCC</option>
                <option value="DCSA">DCSA</option>
                <option value="DMCC">DMCC</option>
                <option value="DPKB">DPKB</option>
                <option value="MHRE">MHRE</option>
                <option value="PFFR">PFFR</option>
                <option value="PCCR">PCCR</option>
              </select>
            </div>
          </div>

          {/* ===== MAP ===== */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Pilih Lokasi di Map
            </label>

            <div className="h-75 rounded-xl overflow-hidden border">
              <MapPicker
                lat={formData.lat}
                lng={formData.lng}
                onSelect={(pos) =>
                  setFormData((prev) => ({
                    ...prev,
                    lat: pos.lat,
                    lng: pos.lng,
                  }))
                }
              />
            </div>

            {formData.lat && (
              <p className="mt-2 text-xs text-gray-600">
                Koordinat: {formData.lat.toFixed(5)}, {formData.lng.toFixed(5)}
              </p>
            )}
          </div>

          {/* ===== BUTTON ===== */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/users")}
              className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : "Daftarkan User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
