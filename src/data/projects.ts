import type { Project } from "@/types/catalog";
import { isApproved } from "../lib/publication";
import { getSolution } from "./solutions";
// No installations have approved ESSCOM attribution or photograph permissions yet.
export const projects: Project[] = [];
export function selectPublishedProjects(records: Project[]) {
  return records
    .filter(
      (item) =>
        isApproved(item) &&
        item.solutionIds.length > 0 &&
        item.solutionIds.every((id) => !!getSolution(id)) &&
        item.images.some(
          (image) => image.approved && image.kind === "photograph",
        ),
    )
    .map((item) => ({
      ...item,
      images: item.images.filter(
        (image) => image.approved && image.kind === "photograph",
      ),
      outcomes: item.outcomes.filter((outcome) => outcome.verified),
    }));
}
export const publishedProjects = selectPublishedProjects(projects);
export const projectHref = (slug: string) => `/projects/${slug}/`;
export const getProject = (slug: string) =>
  publishedProjects.find((item) => item.slug === slug);
