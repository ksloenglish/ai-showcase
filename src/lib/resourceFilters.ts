import { categoryDefinitions, type ResourceCategory } from "@/resourceCatalogue";

export function getSelectedResourceCategory(search: string): ResourceCategory | null {
  const requestedCategory = new URLSearchParams(search).get("category") as ResourceCategory | null;
  return categoryDefinitions.some(category => category.id === requestedCategory)
    ? requestedCategory
    : null;
}

export function getResourceArchiveSearch(search: string): string {
  const selectedCategory = getSelectedResourceCategory(search);
  return selectedCategory ? `?category=${encodeURIComponent(selectedCategory)}` : "";
}
