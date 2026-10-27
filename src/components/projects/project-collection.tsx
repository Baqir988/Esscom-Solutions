"use client";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import type { Project } from "@/types/catalog";
import { filterProjects } from "@/lib/catalog";
import { ProjectGrid } from "./project-card";
import { ProjectEmpty } from "./project-empty";

export function ProjectCollection({
  items,
  categories,
}: {
  items: Project[];
  categories: { id: string; name: string }[];
}) {
  const [solution, setSolution] = useState("all");
  const [industry, setIndustry] = useState("all");
  const availableCategories = categories.filter((category) =>
    items.some((item) => item.solutionIds.includes(category.id)),
  );
  const industries = [...new Set(items.map((item) => item.industry))].sort();
  const showSolutions = items.length >= 3 && availableCategories.length > 1;
  const showIndustries = items.length >= 3 && industries.length > 1;
  const results = filterProjects(items, solution, industry);
  const reset = () => {
    setSolution("all");
    setIndustry("all");
  };
  if (!items.length) return <ProjectEmpty />;
  return (
    <div>
      {(showSolutions || showIndustries) && (
        <div className="portfolio-toolbar">
          {showSolutions && (
            <div className="filter-field">
              <label htmlFor="project-solution">Solution type</label>
              <select
                id="project-solution"
                value={solution}
                onChange={(event) => setSolution(event.target.value)}
                aria-controls="project-results"
              >
                <option value="all">All solutions</option>
                {availableCategories.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {showIndustries && (
            <div className="filter-field">
              <label htmlFor="project-industry">Industry</label>
              <select
                id="project-industry"
                value={industry}
                onChange={(event) => setIndustry(event.target.value)}
                aria-controls="project-results"
              >
                <option value="all">All industries</option>
                {industries.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
          )}
          <button
            className="filter-reset"
            type="button"
            onClick={reset}
            disabled={solution === "all" && industry === "all"}
          >
            <RotateCcw size={16} aria-hidden="true" />
            Clear filters
          </button>
        </div>
      )}
      <p className="results-bar" role="status" aria-live="polite">
        {results.length} of {items.length} approved projects
      </p>
      <div id="project-results">
        {results.length ? (
          <ProjectGrid items={results} categories={categories} />
        ) : (
          <div className="collection-empty">
            <h3>No projects match these filters.</h3>
            <p>Try another solution or industry.</p>
            <button
              type="button"
              className="button button-primary"
              onClick={reset}
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
