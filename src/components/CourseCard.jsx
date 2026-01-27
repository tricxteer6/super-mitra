import { useNavigate } from "react-router-dom";

export default function CourseCard({ course, isVipUser }) {
  const navigate = useNavigate();

  // Pastikan isVip terbaca benar
  const isVipCourse =
    course.isVip === true || course.isVip === 1 || course.isVip === "1";

  const isLocked = isVipCourse && !isVipUser;

  const handleCardClick = () => {
    if (isLocked) return;
    navigate(`/course/${course.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`relative h-90 flex w-full flex-col overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm transition-all duration-300
        ${isLocked ? "cursor-default" : "cursor-pointer hover:shadow-lg hover:-translate-y-1"}`}
    >
      {/* ===== THUMBNAIL ===== */}
      <div className="relative w-full h-40 bg-gray-200 overflow-hidden">
        {course.image ? (
          <img
            src={`http://localhost:5000${course.image}`}
            alt={course.title}
            className={`h-full w-full object-cover transition-transform duration-500
              ${isLocked ? "grayscale opacity-60" : "hover:scale-105"}`}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-gray-400">
            No Image
          </div>
        )}

        {/* LOCK OVERLAY */}
        {isLocked && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-white mb-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Terkunci
            </span>
          </div>
        )}
      </div>

      {/* ===== CONTENT ===== */}
      <div className="flex flex-1 flex-col p-4">
        {/* TITLE */}
        <h3 className="line-clamp-2 text-base font-bold text-gray-900">
          {course.title}
        </h3>

        {/* INSTRUCTOR */}
        <p className="mt-1 text-sm text-gray-500">
          {course.instructor || "Instruktur"}
        </p>

        {/* CATEGORY */}
        {course.category && (
          <p className="mt-1 text-xs text-gray-400">
            Kategori: {course.category}
          </p>
        )}

        {/* BADGE */}
        <div className="mt-2">
          {isVipCourse ? (
            <span className="inline-block rounded bg-yellow-400 px-2 py-0.5 text-[11px] font-bold text-black">
              VIP
            </span>
          ) : (
            <span className="inline-block rounded bg-gray-300 px-2 py-0.5 text-[11px] font-bold text-gray-700">
              FREE
            </span>
          )}
        </div>

        {/* BUTTON */}
        <div className="mt-auto pt-3">
          {isLocked ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/upgrade");
              }}
              className="w-full rounded-lg bg-gray-200 py-2 text-sm font-bold text-gray-600 hover:bg-gray-300"
            >
              Upgrade VIP
            </button>
          ) : (
            <button className="w-full rounded-lg bg-[#00A651] py-2 text-sm font-bold text-white hover:bg-[#008F45]">
              Mulai Belajar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
