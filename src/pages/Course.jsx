import { useState, useEffect } from "react";
import { courses } from "../database/CourseData";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";
import CourseCard from "../components/CourseCard";
import PromoCarousel from "../components/PromoCarousel";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ categories: [], vipOnly: false });
  const [sortBy, setSortBy] = useState("relevant");
  const [showFilter, setShowFilter] = useState(false);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const isVipUser = storedUser?.role === "vip" || storedUser?.role === "admin";
  const navigate = useNavigate();
  useEffect(() => {
    if (!storedUser) {
      navigate("/login");
    }
  }, []);
  const filteredCourses = courses
    .filter((course) => {
      const matchSearch = course.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(course.category);
      const matchVip = !filters.vipOnly || course.isVip;
      return matchSearch && matchCategory && matchVip;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.id - a.id;
        default:
          return 0;
      }
    });
  return (
    <div className="px-4 py-24 md:px-20">
      {" "}
      {/* Promo Carousel */} <PromoCarousel />{" "}
      <div className="mt-10">
        {" "}
        <h1 className="mb-6 mt-10 text-3xl font-bold">All Courses</h1>{" "}
      </div>{" "}
      {/* Top Bar */}{" "}
      <div className="mb-4 py-2 flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        {" "}
        <SearchBar search={search} setSearch={setSearch} />{" "}
        <div className="flex gap-2">
          {" "}
          {/* Filter Button Mobile */}{" "}
          <button
            onClick={() => setShowFilter(true)}
            className="rounded-md border px-4 py-2 text-sm md:hidden"
          >
            {" "}
            Filter{" "}
          </button>{" "}
          {/* Sort */}{" "}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full rounded-md border px-4 py-2 text-sm md:w-auto"
          >
            {" "}
            <option value="relevant">Paling Relevan</option>{" "}
            <option value="newest">Terbaru</option>{" "}
          </select>{" "}
        </div>{" "}
      </div>{" "}
      <div className="grid grid-cols-12 gap-6">
        {" "}
        {/* Sidebar Desktop */}{" "}
        <aside className="col-span-3 hidden md:block">
          {" "}
          <FilterSidebar filters={filters} setFilters={setFilters} />{" "}
        </aside>{" "}
        {/* Course Grid */}{" "}
        <main className="col-span-12 md:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {" "}
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} isVipUser={isVipUser} />
          ))}{" "}
        </main>{" "}
      </div>{" "}
      {/* Mobile Filter Drawer */}{" "}
      {showFilter && (
        <div className="fixed inset-0 z-50 bg-black/40">
          {" "}
          <div className="absolute bottom-0 w-full rounded-t-xl bg-white p-4">
            {" "}
            <div className="mb-4 flex items-center justify-between">
              {" "}
              <h3 className="font-semibold">Filter</h3>{" "}
              <button onClick={() => setShowFilter(false)} className="text-lg">
                {" "}
                ✕{" "}
              </button>{" "}
            </div>{" "}
            <FilterSidebar filters={filters} setFilters={setFilters} />{" "}
            <button
              onClick={() => setShowFilter(false)}
              className="mt-4 w-full rounded-md bg-green-600 py-2 text-sm font-semibold text-white"
            >
              {" "}
              Terapkan Filter{" "}
            </button>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </div>
  );
}
