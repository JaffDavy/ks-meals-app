import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function CategoryMeals() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchMeals() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        const data = await res.json();
        setMeals(data.meals || []);
      } catch (err) {
        console.error("❌ Failed to load meals:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMeals();
  }, [category]);

  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading meals...
      </div>
    );
  }

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="inline-block bg-gray-700 text-white px-4 py-2 rounded mb-4 hover:bg-gray-600 transition"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-4 text-center capitalize">
        {category} Meals
      </h1>

      <input
        type="text"
        placeholder="Search meals..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-6 rounded bg-gray-800 text-white border border-gray-600"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredMeals.map((meal) => (
          <Link
            to={`/meal/${meal.idMeal}`}
            key={meal.idMeal}
            className="bg-gray-800 p-2 rounded-lg shadow hover:scale-105 transition text-center"
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="rounded-md mb-2"
            />
            <p className="font-semibold">{meal.strMeal}</p>
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

export default CategoryMeals;
