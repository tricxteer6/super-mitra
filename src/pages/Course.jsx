import { useState, useEffect } from "react";
import api from "../services/api";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";
import CourseCard from "../components/CourseCard";
import PromoCarousel from "../components/PromoCarousel";
import { useNavigate } from "react-router-dom";

export default function Course() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ categories: [], vipOnly: false });
  const [sortBy, setSortBy] = useState("relevant");
  const [showFilter, setShowFilter] = useState(false);
  const [courses, setCourses] = useState([]);
  // ambil kategori unik dari course
  const categories = Array.from(
    new Set(courses.map((c) => c.category).filter(Boolean)),
  );

  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const isVipUser = storedUser?.role === "vip" || storedUser?.role === "admin";

  // 🔐 Redirect kalau belum login
  useEffect(() => {
    if (!storedUser) navigate("/login");
  }, [storedUser, navigate]);

  // 📦 Fetch course
  useEffect(() => {
    api.get("/course").then((res) => {
      setCourses(
        res.data.map((c) => ({
          ...c,
          isVip: Boolean(c.isVip),
        })),
      );
    });
  }, []);

  const filteredCourses = courses
    .filter((course) => {
      const matchSearch = course.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(course.category);

      const matchVip = !filters.vipOnly || course.isVip;

      return matchSearch && matchCategory && matchVip;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return b.id - a.id;
      return 0;
    });

  return (
    <div className="px-4 py-24 md:px-20">
      {/* PROMO */}
      <PromoCarousel />

      <h1 className="mt-10 mb-6 text-3xl font-bold">All Courses</h1>

      {/* TOP BAR */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center">
        <SearchBar search={search} setSearch={setSearch} />

        <div className="flex gap-2">
          <button
            onClick={() => setShowFilter(true)}
            className="rounded-md border px-4 py-2 text-sm md:hidden"
          >
            Filter
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-md border px-4 py-2 text-sm"
          >
            <option value="relevant">Paling Relevan</option>
            <option value="newest">Terbaru</option>
          </select>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-12 gap-6">
        <aside className="col-span-3 hidden md:block">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            categories={categories}
          />
        </aside>

        <main className="col-span-12 md:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isVipUser={isVipUser}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Tidak ada course
            </p>
          )}
        </main>
      </div>

      {/* MOBILE FILTER */}
      {showFilter && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="absolute bottom-0 w-full rounded-t-xl bg-white p-4">
            <div className="mb-4 flex justify-between">
              <h3 className="font-semibold">Filter</h3>
              <button onClick={() => setShowFilter(false)}>✕</button>
            </div>

            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              categories={categories}
            />

            <button
              onClick={() => setShowFilter(false)}
              className="mt-4 w-full rounded-md bg-green-600 py-2 text-sm font-semibold text-white"
            >
              Terapkan Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
