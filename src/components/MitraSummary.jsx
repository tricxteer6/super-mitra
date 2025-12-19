export default function MitraSummary({
  mitra,
  selectedCategory,
  setSelectedCategory,
}) {
  const categoryCount = mitra.reduce((acc, item) => {
    acc[item.business_category] = (acc[item.business_category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-4 mb-4">
      {/* TOTAL */}
      <div className="bg-red-600 text-white rounded-xl p-6 text-center">
        <div className="text-sm">Total</div>
        <div className="text-3xl font-bold">{mitra.length}</div>
      </div>

      {/* CATEGORY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {Object.entries(categoryCount).map(([cat, count]) => (
          <button
            key={cat}
            onClick={() =>
              setSelectedCategory(cat === selectedCategory ? null : cat)
            }
            className={`border rounded-xl p-3 flex flex-col items-center gap-2
              ${
                selectedCategory === cat
                  ? "border-red-600 bg-red-50"
                  : "border-gray-200"
              }
            `}
          >
            {/* LOGO PLACEHOLDER */}
            <img
              src={`../brands/${cat}.png`}
              alt={cat}
              className="w-10 h-10 object-contain"
            />
            <div className="text-sm font-semibold">{cat}</div>
            <div className="text-xs text-gray-500">({count})</div>
          </button>
        ))}
      </div>
    </div>
  );
}
