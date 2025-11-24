import { Routes, Route } from "react-router-dom";
import Layout from "./Components/layout/layout";
import Home from "./Components/pages/home";
import Categories from "./Components/pages/categories";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="categories" element={<Categories />} />
      </Route>
    </Routes>
  );
}
