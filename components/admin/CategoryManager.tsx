"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import FormField from "@/components/admin/FormField";
import ItemCard from "@/components/admin/ItemCard";
import type { ProjectCategory } from "@/lib/types";

interface Props {
  categories: ProjectCategory[];
  fallbackCategoryCount: number;
}

export default function CategoryManager({ categories, fallbackCategoryCount }: Props) {
  const [adding, setAdding] = useState(categories.length === 0);

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-(--text-secondary)">
          Categories control projects page section order and visibility.
        </p>
        <button
          type="button"
          onClick={() => setAdding((value) => !value)}
          className="inline-flex items-center gap-2 rounded-lg border border-(--border) px-3 py-2 text-sm hover:border-(--accent) hover:text-(--accent)"
        >
          <Plus size={14} />
          Add category
        </button>
      </div>

      {adding ? (
        <form action="/api/admin/category" method="post" className="grid gap-4 rounded-xl border border-(--border) bg-(--bg-surface)/50 p-4">
          <input type="hidden" name="action" value="create" />
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Slug" inputProps={{ name: "slug", placeholder: "mobile-apps", required: true }} />
            <FormField label="Label" inputProps={{ name: "label", placeholder: "Mobile Apps", required: true }} />
          </div>
          <FormField
            type="textarea"
            label="Description"
            textareaProps={{ name: "description", rows: 2, placeholder: "Section description..." }}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              label="Sort Order"
              inputProps={{
                name: "sortOrder",
                type: "number",
                defaultValue: fallbackCategoryCount,
              }}
            />
            <label className="flex items-center gap-2 self-end pb-2 text-sm text-(--text-secondary)">
              <input type="checkbox" name="visible" defaultChecked className="admin-checkbox" />
              Visible on projects page
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
              Create Category
            </button>
          </div>
        </form>
      ) : null}

      {categories.length === 0 ? (
        <p className="rounded-xl border border-dashed border-(--border) p-4 text-sm text-(--text-secondary)">
          No categories yet. Add your first category to start organizing projects.
        </p>
      ) : (
        categories.map((category) => (
          <ItemCard
            key={category._id ?? category.slug}
            title={category.label}
            subtitle={category.slug}
            badges={[
              `order:${category.sortOrder}`,
              category.visible ? "visible" : "hidden",
            ]}
          >
            <form action="/api/admin/category" method="post" className="grid gap-4">
              <input type="hidden" name="id" value={category._id ?? ""} />
              <input type="hidden" name="action" value="update" />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField label="Slug" inputProps={{ name: "slug", defaultValue: category.slug, required: true }} />
                <FormField
                  label="Label"
                  inputProps={{ name: "label", defaultValue: category.label, required: true }}
                />
              </div>

              <FormField
                type="textarea"
                label="Description"
                textareaProps={{
                  name: "description",
                  defaultValue: category.description,
                  rows: 2,
                }}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  label="Sort Order"
                  inputProps={{ name: "sortOrder", type: "number", defaultValue: category.sortOrder }}
                />
                <label className="flex items-center gap-2 self-end pb-2 text-sm text-(--text-secondary)">
                  <input
                    type="checkbox"
                    name="visible"
                    defaultChecked={category.visible}
                    className="admin-checkbox"
                  />
                  Visible on projects page
                </label>
              </div>

              <div className="flex justify-end gap-2">
                {category._id ? (
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
                  Save Category
                </button>
              </div>
            </form>
          </ItemCard>
        ))
      )}
    </div>
  );
}
