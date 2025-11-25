import { useState, useEffect } from "react";
import SearchBar from "../SearchBar";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories);
        setFiltered(data.categories);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSearch = (text) => {
    const results = categories.filter((cat) =>
      cat.strCategory.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(results);
  };

  if (loading)
    return (
      <main className="flex flex-col items-center justify-center h-screen text-white">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white font-mono text-xl animate-pulse mt-4">
          Loading categories...
        </p>
      </main>
    );

  return (
    <div className="p-4 text-white">
      <h1 className="text-black text-3xl font-bold text-center mb-4">
        Categories
      </h1>

      <SearchBar onSearch={handleSearch} placeholder="Search categories..." />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {filtered.map((cat) => (
          <Link
            to={`/category/${cat.strCategory}`}
            key={cat.idCategory}
            className="bg-gray-800 p-3 rounded text-center hover:scale-105 transition"
          >
            <img
              src={cat.strCategoryThumb}
              className="rounded mb-2"
              alt={cat.strCategory}
            />
            <p className="font-semibold">{cat.strCategory}</p>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-red-400 mt-6">
          No matching categories found.
        </p>
      )}
    </div>
  );
}
