import ky from "ky";

const api = ky.create({
  prefixUrl: "https://www.themealdb.com/api/json/v1/1",
});

export const getCategories = () => api.get("categories.php").json();
export const getMealsByCategory = (category) =>
  api.get(`filter.php?c=${category}`).json();
export const getMealDetails = (id) => api.get(`lookup.php?i=${id}`).json();
