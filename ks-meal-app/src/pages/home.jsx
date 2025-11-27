import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl max-w-4xl w-full text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 flex items-center justify-center">
          <span className="mr-3 text-amber-500">🍽️</span>
          Welcome to KS-MealsApp
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Your culinary guide to exploring delicious food categories and viewing
          detailed meal recipes from around the world.
        </p>

        <button
          onClick={() => navigate("/categories")}
          className="
            px-10 py-3 
            bg-amber-500 hover:bg-amber-600 
            text-white 
            text-lg font-semibold 
            rounded-full 
            transition duration-300 ease-in-out 
            transform hover:scale-105 
            shadow-lg hover:shadow-xl
          "
        >
          Browse All Categories &rarr;
        </button>

        <p className="mt-8 text-sm text-gray-400"></p>
      </div>
    </div>
  );
}
