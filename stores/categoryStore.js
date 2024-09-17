// stores/categoryStore.js

import { defineStore } from "pinia";
import { ref, computed } from "vue";
// TODO: Import utility functions from db.js as needed

export const useCategoryStore = defineStore("category", () => {
  // State
  const categories = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // Getters
  const sortedCategories = computed(() => {
    // TODO: Implement logic to return categories sorted alphabetically
  });

  const getCategoryById = computed(() => (id) => {
    // TODO: Implement logic to find and return a category by id
  });

  // Actions
  const fetchCategories = async () => {
    // TODO: Implement fetching categories from the database
  };

  const addCategory = async (category) => {
    // TODO: Implement adding a new category
  };

  const updateCategory = async (id, updates) => {
    // TODO: Implement updating an existing category
  };

  const deleteCategory = async (id) => {
    // TODO: Implement deleting a category (with safeguards)
  };

  const getCategoryUsage = async (id) => {
    // TODO: Implement logic to get usage count of a category in cash out transactions
  };

  return {
    // State
    categories,
    isLoading,
    error,
    // Getters
    sortedCategories,
    getCategoryById,
    // Actions
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryUsage,
  };
});
