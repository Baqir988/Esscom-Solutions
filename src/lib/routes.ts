import { publishedSolutions } from "../data/solutions";
import { publishedProducts } from "../data/products";
import { publishedProjects } from "../data/projects";
import { productCategories } from "../data/product-categories";

// Privacy stays excluded until reviewed legal copy replaces its staging page.
export const publicContentPaths = [
  "/", "/about/", "/solutions/", "/products/", "/projects/", "/clients-partners/", "/contact/",
  ...publishedSolutions.map(({ slug }) => `/solutions/${slug}/`),
  ...publishedProducts.map(({ slug }) => `/products/${slug}/`),
  ...productCategories.map(({ id }) => `/products/category/${id}/`),
  ...publishedProjects.map(({ slug }) => `/projects/${slug}/`),
];
