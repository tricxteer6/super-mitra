import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const isVipUser = user?.role === "vip" || user?.role === "admin";

  useEffect(() => {
    api
      .get(`/course/${id}`)
      .then((res) => setCourse(res.data))
      .catch(() => setCourse(null))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    api.get("/course").then((res) => {
      setAllCourses(res.data || []);
    });
  }, []);

  if (loading) return <p className="pt-24 text-center">Loading...</p>;
  if (!course)
    return <p className="pt-24 text-center">Course tidak ditemukan</p>;

  const isVipCourse = Boolean(course.isVip);
  const locked = isVipCourse && !isVipUser;

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return "";
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}?playsinline=1&rel=0`
      : url;
  };

  const recommendedCourses = allCourses
    .filter((c) => c.id !== course.id)
    .filter((c) => c.category === course.category)
    .slice(0, 4);

  return (
    <div className="pt-25 pb-10 min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* ================= MAIN ================= */}
          <div className="lg:col-span-8 xl:col-span-9 max-w-225">
            {/* VIDEO */}
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
              <iframe
                src={getYouTubeEmbedUrl(course.embed_url)}
                className={`w-full h-full ${
                  locked ? "pointer-events-none grayscale brightness-75" : ""
                }`}
                allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* TITLE */}
            <h1 className="mt-4 text-xl sm:text-2xl font-bold text-gray-900">
              {course.title}
            </h1>

            {/* META (INSTRUKTUR + BADGE) */}
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span className="font-medium">
                {course.instructor || "Instruktur"}
              </span>

              {course.isVip ? (
                <span className="rounded bg-yellow-400 px-2 py-0.5 text-xs font-bold text-black">
                  VIP
                </span>
              ) : (
                <span className="rounded bg-gray-300 px-2 py-0.5 text-xs font-bold text-gray-700">
                  FREE
                </span>
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="mt-4 rounded-xl bg-gray-100 p-4 text-sm text-gray-700 max-w-full overflow-hidden">
              <p
                className={`leading-relaxed wrap-break-word ${
                  showFullDesc ? "" : "line-clamp-3"
                }`}
              >
                {course.description || "Tidak ada deskripsi."}
              </p>

              {course.description && course.description.length > 120 && (
                <button
                  onClick={() => setShowFullDesc(!showFullDesc)}
                  className="mt-2 text-sm font-semibold text-blue-600 hover:underline"
                >
                  {showFullDesc ? "Lebih sedikit" : "Lainnya"}
                </button>
              )}
            </div>

            {/* ===== REKOMENDASI (MOBILE) ===== */}
            <div className="mt-8 lg:hidden">
              <p className="mb-3 text-sm font-bold text-gray-700">
                Rekomendasi Course
              </p>

              <div className="space-y-3">
                {recommendedCourses.map((item) => {
                  const isVipCourse =
                    item.isVip === true ||
                    item.isVip === 1 ||
                    item.isVip === "1";
                  const isLocked = isVipCourse && !isVipUser;

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        if (isLocked) return;
                        navigate(`/course/${item.id}`);
                      }}
                      className="relative flex gap-3 rounded-xl bg-white p-3 transition hover:bg-gray-100"
                    >
                      {/* ===== THUMBNAIL ===== */}
                      <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                        {item.image ? (
                          <img
                            src={`http://localhost:5000${item.image}`}
                            alt={item.title}
                            className={`w-full h-full object-cover ${
                              isLocked ? "grayscale opacity-60" : ""
                            }`}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                            No Image
                          </div>
                        )}

                        {/* ===== OVERLAY TERKUNCI (MOBILE) ===== */}
                        {isLocked && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="w-5 h-5 text-white mb-0.5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                              />
                            </svg>
                            <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                              Terkunci
                            </span>
                          </div>
                        )}
                      </div>

                      {/* ===== INFO ===== */}
                      <div className="flex flex-col overflow-hidden">
                        <p className="line-clamp-2 text-sm font-semibold text-gray-900">
                          {item.title}
                        </p>

                        {isVipCourse ? (
                          <span className="mt-1 w-fit rounded bg-yellow-300 px-2 py-0.5 text-[10px] font-bold text-black">
                            VIP
                          </span>
                        ) : (
                          <span className="mt-1 w-fit rounded bg-gray-300 px-2 py-0.5 text-[10px] font-bold text-gray-700">
                            FREE
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ================= SIDEBAR (DESKTOP) ================= */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="space-y-3">
              <p className="text-sm font-bold text-gray-700">
                Rekomendasi Course
              </p>

              {recommendedCourses.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (item.isVip && !isVipUser) return;
                    navigate(`/course/${item.id}`);
                  }}
                  className="relative flex gap-3 cursor-pointer rounded-xl bg-white p-3 hover:bg-gray-100 transition"
                >
                  {/* ===== THUMBNAIL ===== */}
                  <div className="relative w-24 h-16 sm:w-32 sm:h-20 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                    {item.image ? (
                      <img
                        src={`http://localhost:5000${item.image}`}
                        alt={item.title}
                        className={`w-full h-full object-cover ${
                          item.isVip && !isVipUser ? "grayscale opacity-60" : ""
                        }`}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                        No Image
                      </div>
                    )}

                    {/* ===== OVERLAY TERKUNCI ===== */}
                    {item.isVip && !isVipUser && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5 text-white mb-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                          />
                        </svg>
                        <span className="text-[10px] font-bold text-white tracking-wider uppercase">
                          Terkunci
                        </span>
                      </div>
                    )}
                  </div>

                  {/* ===== INFO ===== */}
                  <div className="flex flex-col overflow-hidden">
                    <p className="line-clamp-2 text-sm font-semibold text-gray-900">
                      {item.title}
                    </p>

                    {/* BADGE */}
                    {item.isVip ? (
                      <span className="mt-1 w-fit rounded bg-yellow-300 px-2 py-0.5 text-[10px] font-bold text-black">
                        VIP
                      </span>
                    ) : (
                      <span className="mt-1 w-fit rounded bg-gray-300 px-2 py-0.5 text-[10px] font-bold text-gray-700">
                        FREE
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
