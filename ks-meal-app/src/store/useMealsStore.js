import { create } from "zustand";
import {
  getCategories,
  getMealsByCategory,
  getMealDetails,
} from "../services/meals.service";

const useMealsStore = create((set) => ({
  categories: [],
  meals: [],
  selectedMeal: null,
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getCategories();
      set({ categories: data, loading: false });
    } catch (err) {
      set({ error: "Failed to load categories", loading: false });
    }
  },

  fetchMeals: async (category) => {
    set({ loading: true, error: null });
    try {
      const data = await getMealsByCategory(category);
      set({ meals: data, loading: false });
    } catch (err) {
      set({ error: "Failed to load meals", loading: false });
    }
  },

  fetchMealDetails: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await getMealDetails(id);
      set({ selectedMeal: data, loading: false });
    } catch (err) {
      set({ error: "Failed to load meal details", loading: false });
    }
  },
}));

export default useMealsStore;
