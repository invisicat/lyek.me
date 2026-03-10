"use client";

import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import FormField from "@/components/admin/FormField";
import ItemCard from "@/components/admin/ItemCard";
import type { Project, ProjectCategory } from "@/lib/types";

interface Props {
  projects: Project[];
  categories: ProjectCategory[];
}

export default function ProjectManager({ projects, categories }: Props) {
  const [adding, setAdding] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredProjects = useMemo(() => {
    if (categoryFilter === "all") {
      return projects;
    }
    return projects.filter((project) => project.categorySlug === categoryFilter);
  }, [projects, categoryFilter]);

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <FormField
          type="select"
          label="Filter by Category"
          selectProps={{
            value: categoryFilter,
            onChange: (event) => setCategoryFilter(event.target.value),
            className: "max-w-xs",
          }}
        >
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.label}
            </option>
          ))}
        </FormField>

        <button
          type="button"
          onClick={() => setAdding((value) => !value)}
          className="inline-flex items-center gap-2 rounded-lg border border-(--border) px-3 py-2 text-sm hover:border-(--accent) hover:text-(--accent)"
        >
          <Plus size={14} />
          Add project
        </button>
      </div>

      {adding ? (
        <form action="/api/admin/project" method="post" className="grid gap-4 rounded-xl border border-(--border) bg-(--bg-surface)/50 p-4">
          <input type="hidden" name="action" value="create" />
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Project Name" inputProps={{ name: "name", required: true }} />
            <FormField label="Link URL" inputProps={{ name: "link", required: true }} />
          </div>
          <FormField type="textarea" label="Description" textareaProps={{ name: "description", rows: 2, required: true }} />
          <FormField
            type="textarea"
            label="Short Description"
            textareaProps={{ name: "descriptionShort", rows: 2, required: true }}
          />
          <div className="grid gap-4 md:grid-cols-3">
            <FormField type="select" label="Category" selectProps={{ name: "categorySlug" }}>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.label}
                </option>
              ))}
            </FormField>
            <FormField type="select" label="Link Type" selectProps={{ name: "linkType" }}>
              <option value="github">GitHub</option>
              <option value="website">Website</option>
            </FormField>
            <FormField type="select" label="Variant" selectProps={{ name: "variant" }}>
              <option value="Short">Short</option>
              <option value="Long">Long</option>
            </FormField>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <FormField label="Sort Order" inputProps={{ name: "sortOrder", type: "number", defaultValue: projects.length }} />
            <FormField label="Tags" hint="Comma separated" inputProps={{ name: "tags", placeholder: "Mobile, AI" }} />
            <FormField label="Icons" hint="Comma separated" inputProps={{ name: "icons", placeholder: "React, Next.js" }} />
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-(--text-secondary)">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="recent" className="admin-checkbox" />
              Recent
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="featured" className="admin-checkbox" />
              Featured on home
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setAdding(false)}
              className="rounded-lg border border-(--border) px-4 py-2 text-sm hover:border-(--accent) hover:text-(--accent)"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg border border-(--accent) bg-(--accent) px-4 py-2 text-sm font-medium text-(--bg) hover:opacity-90"
            >
              Create Project
            </button>
          </div>
        </form>
      ) : null}

      {filteredProjects.length === 0 ? (
        <p className="rounded-xl border border-dashed border-(--border) p-4 text-sm text-(--text-secondary)">
          No projects for this filter.
        </p>
      ) : (
        filteredProjects.map((project) => (
          <ItemCard
            key={project._id ?? project.name}
            title={project.name}
            subtitle={project.descriptionShort || project.description}
            badges={[
              project.categorySlug,
              `order:${project.sortOrder}`,
              ...(project.recent ? ["recent"] : []),
              ...(project.featured ? ["featured"] : []),
            ]}
          >
            <form action="/api/admin/project" method="post" className="grid gap-4">
              <input type="hidden" name="id" value={project._id ?? ""} />
              <input type="hidden" name="action" value="update" />
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  label="Project Name"
                  inputProps={{ name: "name", defaultValue: project.name, required: true }}
                />
                <FormField
                  label="Link URL"
                  inputProps={{ name: "link", defaultValue: project.link, required: true }}
                />
              </div>
              <FormField
                type="textarea"
                label="Description"
                textareaProps={{ name: "description", defaultValue: project.description, rows: 2, required: true }}
              />
              <FormField
                type="textarea"
                label="Short Description"
                textareaProps={{
                  name: "descriptionShort",
                  defaultValue: project.descriptionShort,
                  rows: 2,
                  required: true,
                }}
              />
              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  type="select"
                  label="Category"
                  selectProps={{ name: "categorySlug", defaultValue: project.categorySlug }}
                >
                  {categories.map((category) => (
                    <option key={category.slug} value={category.slug}>
                      {category.label}
                    </option>
                  ))}
                </FormField>
                <FormField type="select" label="Link Type" selectProps={{ name: "linkType", defaultValue: project.linkType }}>
                  <option value="github">GitHub</option>
                  <option value="website">Website</option>
                </FormField>
                <FormField type="select" label="Variant" selectProps={{ name: "variant", defaultValue: project.variant }}>
                  <option value="Short">Short</option>
                  <option value="Long">Long</option>
                </FormField>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  label="Sort Order"
                  inputProps={{ name: "sortOrder", type: "number", defaultValue: project.sortOrder }}
                />
                <FormField label="Tags" inputProps={{ name: "tags", defaultValue: project.tags.join(", ") }} />
                <FormField label="Icons" inputProps={{ name: "icons", defaultValue: project.icons.join(", ") }} />
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-(--text-secondary)">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="recent" defaultChecked={project.recent} className="admin-checkbox" />
                  Recent
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="featured"
                    defaultChecked={project.featured}
                    className="admin-checkbox"
                  />
                  Featured on home
                </label>
              </div>
              <div className="flex justify-end gap-2">
                {project._id ? (
                  <button
                    type="submit"
                    name="action"
                    value="delete"
                    className="rounded-lg border border-red-500/40 px-4 py-2 text-sm text-red-300 hover:border-red-400"
                  >
                    Delete
                  </button>
                ) : null}
                <button
                  type="submit"
                  className="rounded-lg border border-(--accent) bg-(--accent) px-4 py-2 text-sm font-medium text-(--bg) hover:opacity-90"
                >
                  Save Project
                </button>
              </div>
            </form>
          </ItemCard>
        ))
      )}
    </div>
  );
}
