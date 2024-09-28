// stores/categoryStore.js

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useDatabase } from "@/composables/useDatabase";
import { useCashOutStore } from "./cashOutStore";

export const useCategoryStore = defineStore("category", () => {
  const {
    STORES,
    addItem,
    getAllItems,
    updateItem,
    deleteItem,
    bulkAdd,
    clearStore,
  } = useDatabase();
  const cashOutStore = useCashOutStore();

  // State
  const categories = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // Getters
  const sortedCategories = computed(() => {
    return [...categories.value].sort((a, b) => a.name.localeCompare(b.name));
  });

  const getCategoryById = computed(() => (id) => {
    return categories.value.find((category) => category.id === id);
  });

  // Actions
  const fetchCategories = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      console.log("Fetching categories from IndexedDB");
      categories.value = await getAllItems(STORES.CATEGORIES);
      console.log("Categories fetched successfully:", categories.value);
    } catch (err) {
      error.value = "Failed to fetch categories: " + err.message;
      console.error("Error fetching categories:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const addCategory = async (category) => {
    isLoading.value = true;
    error.value = null;
    try {
      console.log("Adding category:", category);
      const id = await addItem(STORES.CATEGORIES, category);
      categories.value.push({ ...category, id });
      console.log("Category added successfully with ID:", id);
      return id;
    } catch (err) {
      error.value = "Failed to add category: " + err.message;
      console.error("Error adding category:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const updateCategory = async (id, updates) => {
    isLoading.value = true;
    error.value = null;
    try {
      console.log("Updating category:", id, updates);
      await updateItem(STORES.CATEGORIES, id, updates);
      const index = categories.value.findIndex((c) => c.id === id);
      if (index !== -1) {
        categories.value[index] = { ...categories.value[index], ...updates };
      }
      console.log("Category updated successfully");
    } catch (err) {
      error.value = "Failed to update category: " + err.message;
      console.error("Error updating category:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteCategory = async (id) => {
    isLoading.value = true;
    error.value = null;
    try {
      // Check if the category is in use
      const cashOutTransactions = cashOutStore.getCashOutByCategory(id);
      if (cashOutTransactions.length > 0) {
        throw new Error("Cannot delete category that is in use");
      }

      console.log("Deleting category:", id);
      await deleteItem(STORES.CATEGORIES, id);
      categories.value = categories.value.filter((c) => c.id !== id);
      console.log("Category deleted successfully");
    } catch (err) {
      error.value = "Failed to delete category: " + err.message;
      console.error("Error deleting category:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const syncCategoriesData = async (serverData) => {
    isLoading.value = true;
    error.value = null;
    try {
      console.log("Syncing categories data");
      await clearStore(STORES.CATEGORIES);
      await bulkAdd(STORES.CATEGORIES, serverData);
      await fetchCategories();
      console.log("Categories data synced successfully");
    } catch (err) {
      error.value = "Failed to sync categories data: " + err.message;
      console.error("Error syncing categories data:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const getCategoryUsage = async (id) => {
    try {
      const cashOutTransactions = cashOutStore.getCashOutByCategory(id);
      return cashOutTransactions.length;
    } catch (err) {
      console.error("Error getting category usage:", err);
      throw err;
    }
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
    syncCategoriesData,
    getCategoryUsage,
  };
});
