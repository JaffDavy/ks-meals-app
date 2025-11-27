import { Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import Home from "./pages/home";
import Categories from "./pages/categories";
import CategoryMeals from "./pages/CategoryMeals";
import MealDetails from "./pages/MealDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="categories" element={<Categories />} />
        <Route path="/category/:category" element={<CategoryMeals />} />
        <Route path="/meal/:id" element={<MealDetails />} />
      </Route>
    </Routes>
  );
}
