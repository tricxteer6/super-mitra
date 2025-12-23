export default function CourseCard({ course, isVipUser }) {
  const locked = course.isVip && !isVipUser;

  return (
    <div className="group h-77 relative rounded-lg border-b-gray-800 bg-white shadow-sm transition hover:shadow-md">
      {/* VIP Badge */}
      {course.isVip && (
        <span className="absolute left-2 top-2 z-10 rounded bg-yellow-400 px-2 py-0.5 text-[10px] font-bold">
          VIP
        </span>
      )}

      {/* Thumbnail */}
      <div className="relative h-36 overflow-hidden rounded-t-lg bg-gray-200">
        {locked && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 text-xs font-semibold text-white">
            Khusus VIP
          </div>
        )}

        <div className="h-full w-full transition group-hover:scale-105" />
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-800">
          {course.title}
        </h3>

        <p className="mt-1 text-xs text-gray-500">{course.instructor}</p>

        <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
          <span>{course.level}</span>
          <span>{course.duration}</span>
        </div>

        {/* Action */}
        <button
          disabled={locked}
          className={`mt-10 w-full rounded-md py-2 text-xs font-semibold transition hover:cursor-pointer
            ${
              locked
                ? "cursor-not-allowed bg-gray-200 text-gray-500"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
        >
          {locked ? "Upgrade ke VIP" : "Mulai Belajar"}
        </button>
      </div>
    </div>
  );
}
