import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          MealsApp
        </Link>

        <nav>
          <Link to="/categories" className="mr-4">
            Categories
          </Link>
        </nav>
      </div>
    </header>
  );
}
