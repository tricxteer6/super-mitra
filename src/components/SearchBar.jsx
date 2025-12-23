export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Cari course..."
      className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
