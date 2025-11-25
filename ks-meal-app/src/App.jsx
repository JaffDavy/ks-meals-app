import { Routes, Route } from "react-router-dom";
import Layout from "./Components/layout/layout";
import Home from "./Components/pages/home";
import Categories from "./Components/pages/categories";
import Meals from "./Components/pages/meals";
import CategoryMeals from "./Components/pages/CategoryMeals";
import MealDetails from "./Components/pages/MealDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="categories" element={<Categories />} />
        <Route path="/category/:name" element={<Meals />} />
        <Route path="category/:category" element={<CategoryMeals />} />
        <Route path="/meal/:id" element={<MealDetails />} />
      </Route>
    </Routes>
  );
}
