import { create } from "zustand";

export const useMealsStore = create((set) => ({
  meals: [],
  loading: false,
  error: null,

  fetchMeals: async (category) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = await res.json();
      set({ meals: data.meals, loading: false });
    } catch (err) {
      set({ error: "Failed to load meals", loading: false });
    }
  },
}));
