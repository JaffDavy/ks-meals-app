import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMealDetails } from "../services/meals.service";

function MealDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const { isLoading, data, error } = useQuery({
    queryKey: ["mealDetails", id],
    queryFn: () => getMealDetails(id),
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xl font-semibold animate-pulse">
          Loading meal details...
        </p>
      </div>
    );

  console.log(data.meals);

  if (!data.meals)
    return (
      <p className="text-red-500 text-center mt-10 font-bold text-xl">
        Meal not found.
      </p>
    );

  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = data.meals[0][`strIngredient${i}`];
    const measure = data.meals[0][`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }
  console.log("Ingredients:", ingredients);

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-8">
      <Link
        to={-1}
        className="inline-block bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition shadow-md"
      >
        ← Back
      </Link>

      <h1 className="text-4xl font-bold text-center text-gray-900">
        {data.meals[0].strMeal}
      </h1>

      <div className="flex justify-center">
        <img
          src={data.meals[0].strMealThumb}
          alt={data.meals[0].strMeal}
          className="rounded-xl shadow-2xl w-full max-w-2xl hover:scale-105 transition-transform"
        />
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md">
        <h2 className="text-white text-2xl font-semibold mb-4">Ingredients</h2>
        <ul className="list-disc ml-6 space-y-1 text-gray-800 dark:text-gray-200">
          {ingredients.map((item, index) => (
            <li key={index} className="hover:text-blue-500 transition-colors">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md">
        <h2 className="text-white text-2xl font-semibold mb-4">Instructions</h2>
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line">
          {data.meals[0].strInstructions}
        </p>
      </div>
    </div>
  );
}

export default MealDetails;
