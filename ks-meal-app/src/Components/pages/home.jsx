import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-4xl font-bold mb-4">Welcome to MealsApp</h1>
      <p className="mb-6 text-center max-w-xl">
        Browse food categories and view meals. Data is fetched from TheMealDB.
      </p>

      <button
        onClick={() => nav("/categories")}
        className="px-6 py-2 bg-blue-600 text-white rounded"
      >
        Get Started
      </button>
    </div>
  );
}
