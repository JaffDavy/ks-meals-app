import { create } from "zustand";

export const useCategoryStore = create((set) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const data = await res.json();
      set({ categories: data.categories, loading: false });
    } catch (err) {
      set({ error: "Failed to load categories", loading: false });
    }
  },
}));
