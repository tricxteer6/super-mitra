import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import UserLocationMap from "../../components/UserLocationMap";
import EditLocationPicker from "../../components/EditLocationPicker";

export default function AdminUsers() {
  const navigate = useNavigate();
  const [editUser, setEditUser] = useState(null);
  const [detailUser, setDetailUser] = useState(null);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/users")
      .then((res) => {
        const list = Array.isArray(res.data)
          ? res.data
          : res.data.data || res.data.users || [];

        setUsers(list);
      })
      .catch((err) => {
        console.error("ADMIN USERS ERROR:", err);
        setUsers([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const deleteUser = async (id) => {
    if (!confirm("Hapus user ini?")) return;
    await api.delete(`/admin/user/${id}`);
    setUsers(users.filter((u) => u.id !== id));
  };

  if (loading) {
    return <p className="pt-28 text-center">Loading...</p>;
  }

  return (
    <div className="pt-28 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          {/* KIRI */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/register")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
            >
              + Tambah User
            </button>

            <h1 className="text-3xl font-bold">Kelola User</h1>
          </div>

          {/* KANAN */}
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="text-sm text-gray-600 hover:text-red-600 underline"
          >
            ← Kembali
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Nama</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Kemitraan</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  onClick={() => setDetailUser(u)}
                  className="border-t hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="p-3 font-medium">{u.nama}</td>
                  <td className="p-3 text-gray-600">{u.email}</td>
                  <td className="p-3 text-gray-600">{u.kemitraan}</td>
                  <td className="p-3 uppercase">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold
                        ${
                          u.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : u.role === "vip"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                        }
                      `}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditUser(u);
                      }}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>

                    {u.role !== "admin" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteUser(u.id);
                        }}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Hapus
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ MODAL EDIT USER (HARUS DI SINI) */}
        {editUser && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-6xl shadow-xl">
              <h2 className="text-xl font-bold mb-4">Edit User</h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ================= LEFT: FORM ================= */}
                <div className="lg:col-span-2 space-y-4">
                  {/* ROW 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Nama</label>
                      <input
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                        value={editUser.nama || ""}
                        onChange={(e) =>
                          setEditUser({ ...editUser, nama: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <input
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                        value={editUser.email || ""}
                        onChange={(e) =>
                          setEditUser({ ...editUser, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* ROW 2 */}
                  <div>
                    <label className="text-sm font-medium">Alamat</label>
                    <input
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      value={editUser.alamat || ""}
                      onChange={(e) =>
                        setEditUser({ ...editUser, alamat: e.target.value })
                      }
                    />
                  </div>

                  {/* ROW 3 – WILAYAH (COMPACT) */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <label className="text-xs font-medium">Kelurahan</label>
                      <input
                        className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                        value={editUser.kelurahan || ""}
                        onChange={(e) =>
                          setEditUser({
                            ...editUser,
                            kelurahan: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium">Kecamatan</label>
                      <input
                        className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                        value={editUser.kecamatan || ""}
                        onChange={(e) =>
                          setEditUser({
                            ...editUser,
                            kecamatan: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium">Kota</label>
                      <input
                        className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                        value={editUser.kota || ""}
                        onChange={(e) =>
                          setEditUser({ ...editUser, kota: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium">Provinsi</label>
                      <input
                        className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                        value={editUser.provinsi || ""}
                        onChange={(e) =>
                          setEditUser({ ...editUser, provinsi: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* ROW 4 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Kode Pos</label>
                      <input
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                        value={editUser.kode_pos || ""}
                        onChange={(e) =>
                          setEditUser({ ...editUser, kode_pos: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Role</label>
                      <select
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                        value={editUser.role}
                        onChange={(e) =>
                          setEditUser({ ...editUser, role: e.target.value })
                        }
                      >
                        <option value="user">User</option>
                        <option value="vip">VIP</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Kemitraan</label>
                      <select
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                        value={editUser.kemitraan}
                        onChange={(e) =>
                          setEditUser({
                            ...editUser,
                            kemitraan: e.target.value,
                          })
                        }
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
                </div>

                {/* ================= RIGHT: MAP ================= */}
                {editUser.role !== "admin" && (
                  <div className="bg-gray-50 rounded-xl p-3 flex flex-col">
                    <p className="text-sm font-semibold mb-2">Lokasi User</p>

                    <div className="flex-1 rounded-lg overflow-hidden border">
                      <EditLocationPicker
                        lat={editUser.lat}
                        lng={editUser.lng}
                        onChange={(pos) =>
                          setEditUser({
                            ...editUser,
                            lat: pos.lat,
                            lng: pos.lng,
                          })
                        }
                      />
                    </div>

                    {editUser.lat && editUser.lng && (
                      <p className="mt-2 text-xs text-gray-600">
                        Koordinat: {Number(editUser.lat).toFixed(5)},{" "}
                        {Number(editUser.lng).toFixed(5)}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* ================= FOOTER ================= */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setEditUser(null)}
                  className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  onClick={async () => {
                    await api.put(`/admin/user/${editUser.id}`, editUser);
                    setUsers(
                      users.map((u) => (u.id === editUser.id ? editUser : u)),
                    );
                    setEditUser(null);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}

        {detailUser && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-5xl">
              <h2 className="text-xl font-bold mb-4">Detail User</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ================= LEFT: DATA ================= */}
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Nama:</span>{" "}
                    {detailUser.nama}
                  </p>

                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {detailUser.email}
                  </p>

                  <p>
                    <span className="font-semibold">Alamat:</span>{" "}
                    {detailUser.alamat || "-"}
                  </p>

                  <p>
                    <span className="font-semibold">Kelurahan:</span>{" "}
                    {detailUser.kelurahan || "-"}
                  </p>

                  <p>
                    <span className="font-semibold">Kecamatan:</span>{" "}
                    {detailUser.kecamatan || "-"}
                  </p>

                  <p>
                    <span className="font-semibold">Kota:</span>{" "}
                    {detailUser.kota || "-"}
                  </p>

                  <p>
                    <span className="font-semibold">Provinsi:</span>{" "}
                    {detailUser.provinsi || "-"}
                  </p>

                  <p>
                    <span className="font-semibold">Kode Pos:</span>{" "}
                    {detailUser.kode_pos || "-"}
                  </p>

                  <p>
                    <span className="font-semibold">Kemitraan:</span>{" "}
                    {detailUser.kemitraan}
                  </p>

                  <p>
                    <span className="font-semibold">Role:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold
                ${
                  detailUser.role === "admin"
                    ? "bg-purple-100 text-purple-700"
                    : detailUser.role === "vip"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                }
              `}
                    >
                      {detailUser.role}
                    </span>
                  </p>
                </div>

                {/* ================= RIGHT: MAP ================= */}
                <div className="w-full h-75 md:h-full rounded-lg overflow-hidden">
                  <UserLocationMap lat={detailUser.lat} lng={detailUser.lng} />
                </div>
              </div>

              {/* FOOTER */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setDetailUser(null)}
                  className="px-4 py-2 text-gray-600 hover:text-black"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
