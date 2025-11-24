import { useEffect } from "react";
import { useCategoryStore } from "../store/categoryStore";

function Categories() {
  const { categories, loading, error, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading)
    return (
      <main>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white font-mono text-xl animate-pulse">
            Loading...
          </p>
        </div>
      </main>
    );
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Categories</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.idCategory}
            className="border rounded-lg p-2 shadow hover:scale-105 transition"
          >
            <img src={cat.strCategoryThumb} alt={cat.strCategory} />
            <h2 className="text-center font-semibold mt-2">
              {cat.strCategory}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
