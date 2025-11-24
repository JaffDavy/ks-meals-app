import axios from "axios";

const API = "https://www.themealdb.com/api/json/v1/1";

export const getCategories = async () => {
  const res = await axios.get(`${API}/categories.php`);
  return res.data.categories;
};

export const getMealsByCategory = async (cat) => {
  const res = await axios.get(`${API}/filter.php?c=${cat}`);
  return res.data.meals;
};

export const getMealDetails = async (id) => {
  const res = await axios.get(`${API}/lookup.php?i=${id}`);
  return res.data.meals[0];
};
