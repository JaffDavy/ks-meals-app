import { useState, useEffect } from "react";
import SearchBar from "../Components/SearchBar";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/meals.service";

export default function Categories() {
  const [filtered, setFiltered] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  useEffect(() => {
    if (data?.categories) {
      setFiltered(data.categories);
    }
  }, [data]);

  if (isLoading)
    return (
      <main className="flex flex-col items-center justify-center h-screen text-white">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white font-mono text-xl animate-pulse mt-4">
          Loading categories...
        </p>
      </main>
    );

  const { categories } = data;

  const handleSearch = (text) => {
    const results = categories.filter((cat) =>
      cat.strCategory.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(results);
  };

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
