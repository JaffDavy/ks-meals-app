import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function CategoryMeals() {
  const { category } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        const data = await res.json();
        setMeals(data.meals);
      } catch (err) {
        console.error("Failed to load meals");
      } finally {
        setLoading(false);
      }
    }

    fetchMeals();
  }, [category]);

  if (loading) return <p className="text-white">Loading meals...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">{category} Meals</h1>

      <div className="grid grid-cols-2 gap-4">
        {meals.map((meal) => (
          <Link
            key={meal.idMeal}
            to={`/meal/${meal.idMeal}`}
            className="border rounded-lg p-2 shadow hover:scale-105 transition block"
          >
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <h2 className="text-center font-semibold mt-2">{meal.strMeal}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryMeals;
