import { useEffect } from "react";
import useMealsStore from "../store/useMealsStore";

export default function Categories() {
  const { categories, loading, error, fetchCategories } = useMealsStore();

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
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((cat) => (
        <div key={cat.idCategory} className="bg-white shadow p-4 rounded">
          <img
            src={cat.strCategoryThumb}
            alt={cat.strCategory}
            className="rounded mb-2"
          />
          <h2 className="font-bold text-center">{cat.strCategory}</h2>
        </div>
      ))}
    </div>
  );
}
