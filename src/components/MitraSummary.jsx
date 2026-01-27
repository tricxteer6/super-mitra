export default function MitraSummary({
  mitra = [],
  selectedCategory,
  setSelectedCategory,
}) {
  // HITUNG PER KEMITRAAN
  const categoryCount = mitra.reduce((acc, item) => {
    if (!item?.kemitraan) return acc;
    acc[item.kemitraan] = (acc[item.kemitraan] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-4 mb-4">
      {/* TOTAL */}
      <div className="bg-red-600 text-white rounded-xl p-6 text-center">
        <div className="text-sm">Total Mitra</div>
        <div className="text-3xl font-bold">{mitra.length}</div>
      </div>

      {/* KATEGORI */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {Object.entries(categoryCount).map(([cat, count]) => (
          <button
            key={cat}
            onClick={() =>
              setSelectedCategory(cat === selectedCategory ? null : cat)
            }
            className={`border rounded-xl p-4 flex flex-col items-center gap-2 transition
              ${
                selectedCategory === cat
                  ? "border-red-600 bg-red-50"
                  : "border-gray-200 hover:border-red-400"
              }
            `}
          >
            {/* LOGO */}
            <img
              src={`/brands/${cat}.png`}
              alt={cat}
              onError={(e) => (e.target.style.display = "none")}
              className="w-10 h-10 object-contain"
            />

            {/* NAMA */}
            <div className="text-sm font-semibold text-center">{cat}</div>

            {/* JUMLAH */}
            <div className="text-xs text-gray-500">({count})</div>
          </button>
        ))}
      </div>
    </div>
  );
}
