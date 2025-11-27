import { api } from "./api.js";

export const getCategories = async () => await api.get("categories.php").json();

export const getMealsByCategory = (category) =>
  api.get(`filter.php?c=${category}`).json();

export const getMealDetails = (id) => api.get(`lookup.php?i=${id}`).json();
