import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMealsStore } from "../store/mealsStore";
import { Link } from "react-router-dom";

function Meals() {
  const { name } = useParams();
  const { meals, loading, error, fetchMeals } = useMealsStore();

  useEffect(() => {
    fetchMeals(name);
  }, [name]);

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
      <h1 className="text-xl font-bold mb-4">{name} Meals</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {meals.map((meal) => (
          <Link
            to={`/meal/${meal.idMeal}`}
            key={meal.idMeal}
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

export default Meals;
