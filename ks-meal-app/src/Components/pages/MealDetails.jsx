import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MealDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMeal() {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        setMeal(data.meals[0]);
      } catch (err) {
        console.error("Failed to load meal details");
      } finally {
        setLoading(false);
      }
    }

    fetchMeal();
  }, [id]);

  if (loading) return <p className="text-white">Loading meal details...</p>;
  if (!meal) return <p className="text-red-500">Meal not found.</p>;

  // Get ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{meal.strMeal}</h1>

      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="rounded-lg mb-4"
      />

      <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc ml-6 mb-4">
        {ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Instructions</h2>
      <p className="whitespace-pre-line">{meal.strInstructions}</p>

      {meal.strYoutube && <div className="mt-4"></div>}
    </div>
  );
}

export default MealDetails;
