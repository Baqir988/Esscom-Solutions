import type { CatalogFilters, CatalogItem, Project } from "../types/catalog";
export const defaultCatalogFilters: CatalogFilters = {
  search: "",
  category: "all",
  sort: "name-asc",
};
const compare = (a: string, b: string) =>
  a.localeCompare(b, "en", { sensitivity: "base", numeric: true });
export function filterCatalog(items: CatalogItem[], filters: CatalogFilters) {
  const terms = filters.search
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  return items
    .filter((item) => {
      const text = [
        item.name,
        item.category,
        item.model ?? "",
        item.description,
        ...item.keywords,
      ]
        .join(" ")
        .toLowerCase();
      return (
        (filters.category === "all" || item.categoryId === filters.category) &&
        terms.every((term) => text.includes(term))
      );
    })
    .sort((a, b) =>
      filters.sort === "category"
        ? compare(a.category, b.category) ||
          compare(a.name, b.name) ||
          compare(a.id, b.id)
        : (filters.sort === "name-desc" ? -1 : 1) *
          (compare(a.name, b.name) || compare(a.id, b.id)),
    );
}
export function catalogCategories(items: CatalogItem[]) {
  return Array.from(
    new Map(
      items.map((item) => [
        item.categoryId,
        { id: item.categoryId, name: item.category },
      ]),
    ).values(),
  ).sort((a, b) => compare(a.name, b.name));
}
export function filterProjects(
  items: Project[],
  solution: string,
  industry: string,
) {
  return items.filter(
    (item) =>
      (solution === "all" || item.solutionIds.includes(solution)) &&
      (industry === "all" || item.industry === industry),
  );
}
