import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function AdminCourses() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const emptyForm = {
    title: "",
    description: "",
    thumbnail: null,
    instructor: "",
    duration: "",
    category: "",
    embed_url: "",
    is_vip: false,
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const res = await api.get("/course");
    setCourses(res.data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("instructor", form.instructor);
    formData.append("duration", form.duration);
    formData.append("category", form.category);
    formData.append("embed_url", form.embed_url);
    formData.append("is_vip", form.is_vip);

    if (form.thumbnail instanceof File) {
      formData.append("thumbnail", form.thumbnail);
    }

    if (editing) {
      await api.put(`/course/${editing.id}`, formData);
    } else {
      await api.post("/course", formData);
    }

    setForm(emptyForm);
    setEditing(null);
    setPreviewImage(null);
    loadCourses();
  };

  const remove = async (id) => {
    if (!confirm("Hapus course ini?")) return;
    await api.delete(`/course/${id}`);
    setCourses(courses.filter((c) => c.id !== id));
  };

  const startEdit = (course) => {
    setEditing(course);
    setForm({
      title: course.title || "",
      description: course.description || "",
      thumbnail: null,
      instructor: course.instructor || "",
      duration: course.duration || "",
      category: course.category || "",
      embed_url: course.embed_url || "",
      is_vip: Boolean(course.isVip),
    });

    setPreviewImage(
      course.thumbnail ? `http://localhost:5000${course.thumbnail}` : null,
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pt-28 px-6 pb-10 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Kelola Course</h1>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="text-sm text-gray-600 hover:text-red-600 underline"
          >
            ← Kembali ke Dashboard
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={submit}
          className="bg-white p-8 rounded-2xl shadow mb-10 space-y-6"
        >
          {/* FORM TITLE */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {editing ? "Edit Course" : "Tambah Course"}
            </h2>

            {editing && (
              <span className="text-xs rounded bg-yellow-100 text-yellow-800 px-3 py-1 font-semibold">
                Mode Edit
              </span>
            )}
          </div>

          {/* BASIC INFO */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                Judul Course
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Contoh: Memasak Ayam Bakar"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Instructor
              </label>
              <input
                name="instructor"
                value={form.instructor}
                onChange={handleChange}
                placeholder="Nama pengajar"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Durasi</label>
              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="Contoh: 2 Jam"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Kategori</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Masakan Nusantara"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
          </div>

          {/* VIDEO */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Embed Video URL (YouTube)
            </label>
            <input
              name="embed_url"
              value={form.embed_url}
              onChange={handleChange}
              placeholder="https://www.youtube.com/watch?v=xxxxx"
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* IMAGE UPLOAD */}
          <label className="block text-sm font-medium mb-2">
            Thumbnail Course
          </label>

          <div className="flex items-center gap-4">
            {/* UPLOAD AREA */}
            <label
              htmlFor="thumbnail"
              className="group flex flex-col items-center justify-center w-48 h-28 rounded-xl border-2 border-dashed border-gray-300 cursor-pointer
               hover:border-red-500 hover:bg-red-50 transition
               focus-within:border-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-400 group-hover:text-red-500 mb-1 transition"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5V19a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 19v-2.5M12 3v12m0 0l-3-3m3 3l3-3"
                />
              </svg>

              <p className="text-xs text-gray-500 group-hover:text-red-600">
                Klik untuk upload
              </p>
              <p className="text-[10px] text-gray-400">JPG / PNG</p>

              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setForm({ ...form, thumbnail: file });
                    setPreviewImage(URL.createObjectURL(file));
                  }
                }}
              />
            </label>

            {/* PREVIEW */}
            {previewImage && (
              <div className="relative">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-24 w-36 rounded-lg object-cover border"
                />

                <button
                  type="button"
                  onClick={() => {
                    setPreviewImage(null);
                    setForm({ ...form, thumbnail: null });
                  }}
                  className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center hover:bg-red-700"
                  title="Hapus gambar"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Deskripsi Course
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Tuliskan deskripsi singkat course"
              className="w-full border rounded-lg px-4 py-2 min-h-30"
            />
          </div>

          {/* VIP TOGGLE */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="is_vip"
              checked={form.is_vip}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">Konten VIP</span>

            {form.is_vip && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                Course ini hanya untuk member VIP
              </span>
            )}
          </div>

          {/* ACTION BUTTON */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700"
            >
              {editing ? "Simpan Perubahan" : "Tambah Course"}
            </button>

            {editing && (
              <button
                type="button"
                onClick={() => {
                  setEditing(null);
                  setForm(emptyForm);
                  setPreviewImage(null);
                }}
                className="px-6 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
              >
                Batal
              </button>
            )}
          </div>
        </form>

        {/* LIST COURSE */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((c) => {
            const isVip = Boolean(c.isVip);
            return (
              <div
                key={c.id}
                className="bg-white rounded-xl shadow-sm border overflow-hidden"
              >
                <div className="relative h-36 bg-gray-200 overflow-hidden">
                  {c.image ? (
                    <img
                      src={`http://localhost:5000${c.image}`}
                      alt={c.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400 text-sm">
                      No Image
                    </div>
                  )}

                  <span
                    className={`absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded ${
                      isVip
                        ? "bg-yellow-400 text-black"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {isVip ? "VIP" : "FREE"}
                  </span>
                </div>

                <div className="p-4 space-y-1">
                  <h3 className="font-semibold text-sm line-clamp-2">
                    {c.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {c.instructor} • {c.duration}
                  </p>
                  <p className="text-xs text-gray-400">
                    Kategori: {c.category}
                  </p>

                  <div className="flex justify-between pt-3 border-t mt-3 text-xs">
                    <button
                      onClick={() => startEdit(c)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => remove(c.id)}
                      className="text-red-600 hover:underline"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
