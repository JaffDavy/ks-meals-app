import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getMealsByCategory } from "../services/meals.service";

function CategoryMeals() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["meals", category],
    queryFn: () => getMealsByCategory(category),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading meals...
      </div>
    );
  }

  console.log(data.meals);

  const filteredMeals = data.meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(search.toLowerCase())
  );

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

      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Search meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-md p-2 mb-6 rounded-lg bg-gray-800 text-white border border-gray-600"
        />
      </div>

      <div className="text-white grid grid-cols-2 md:grid-cols-3 gap-4">
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
