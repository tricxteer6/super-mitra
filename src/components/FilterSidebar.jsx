export default function FilterSidebar({ filters, setFilters }) {
  const categories = [
    "Masakan Indonesia",
    "Masakan Internasional",
    "Masakan Rumahan",
    "Bakery",
    "Dessert",
    "Healthy Food",
    "Bisnis Kuliner",
    "Basic Cooking",
  ];

  const toggleCategory = (category) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  return (
    <div className="space-y-6 text-sm">
      {/* KATEGORI */}
      <div>
        <h3 className="mb-3 font-semibold text-gray-800">Kategori</h3>
        <div className="space-y-2">
          {categories.map((cat) => {
            const checked = filters.categories.includes(cat);

            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className={`flex w-full items-center justify-between rounded-md border px-3 py-2 transition
                  ${
                    checked
                      ? "border-green-600 bg-green-50 text-green-700"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
              >
                <span>{cat}</span>

                <span
                  className={`flex h-4 w-4 items-center justify-center rounded border
                    ${
                      checked
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-gray-300"
                    }`}
                >
                  {checked && " "}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* AKSES */}
      <div>
        <h3 className="mb-3 font-semibold text-gray-800">Akses</h3>

        <button
          type="button"
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              vipOnly: !prev.vipOnly,
            }))
          }
          className={`flex w-full items-center justify-between rounded-md border px-3 py-2 transition
            ${
              filters.vipOnly
                ? "border-green-600 bg-green-50 text-green-700"
                : "border-gray-200 hover:bg-gray-50"
            }`}
        >
          <span>VIP</span>

          <span
            className={`flex h-4 w-4 items-center justify-center rounded border
              ${
                filters.vipOnly
                  ? "border-green-600 bg-green-600 text-white"
                  : "border-gray-300"
              }`}
          >
            {filters.vipOnly && ""}
          </span>
        </button>
      </div>
    </div>
  );
}
