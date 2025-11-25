import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useMealsStore } from "../store/mealsStore";
import SearchBar from "../SearchBar";

function Meals() {
  const { name } = useParams();
  const { meals, loading, error, fetchMeals } = useMealsStore();

  const [filteredMeals, setFilteredMeals] = useState([]);

  useEffect(() => {
    fetchMeals(name);
  }, [name]);

  useEffect(() => {
    setFilteredMeals(meals);
  }, [meals]);

  const handleSearch = (query) => {
    const results = meals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMeals(results);
  };

  if (loading)
    return (
      <main className="flex flex-col items-center justify-center h-screen text-white">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white font-mono text-xl animate-pulse mt-4">
          Loading...
        </p>
      </main>
    );

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <Link
        to="/categories"
        className="inline-block mb-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
      >
        ← Back to Categories
      </Link>

      <h1 className="text-2xl font-bold mb-4 text-center">{name} Meals</h1>

      <SearchBar onSearch={handleSearch} placeholder="Search meals..." />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {filteredMeals.map((meal) => (
          <Link
            to={`/meal/${meal.idMeal}`}
            key={meal.idMeal}
            className="bg-gray-800 text-white border rounded-lg p-2 shadow hover:scale-105 transition block"
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="rounded mb-2"
            />
            <h2 className="text-center font-semibold">{meal.strMeal}</h2>
          </Link>
        ))}
      </div>

      {filteredMeals.length === 0 && (
        <p className="text-center text-red-400 mt-6">
          No meals match your search.
        </p>
      )}
    </div>
  );
}

export default Meals;
