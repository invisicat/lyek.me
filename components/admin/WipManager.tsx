"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import FormField from "@/components/admin/FormField";
import ItemCard from "@/components/admin/ItemCard";
import type { WipProject } from "@/lib/types";

interface Props {
  items: WipProject[];
}

export default function WipManager({ items }: Props) {
  const [adding, setAdding] = useState(false);

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-(--text-secondary)">Track in-progress work with optional links and timeline labels.</p>
        <button
          type="button"
          onClick={() => setAdding((value) => !value)}
          className="inline-flex items-center gap-2 rounded-lg border border-(--border) px-3 py-2 text-sm hover:border-(--accent) hover:text-(--accent)"
        >
          <Plus size={14} />
          Add WIP item
        </button>
      </div>

      {adding ? (
        <form action="/api/admin/wip" method="post" className="grid gap-4 rounded-xl border border-(--border) bg-(--bg-surface)/50 p-4">
          <input type="hidden" name="action" value="create" />
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Name" inputProps={{ name: "name", required: true }} />
            <FormField label="Date label" inputProps={{ name: "date", placeholder: "Spring 2026" }} />
          </div>
          <FormField type="textarea" label="Description" textareaProps={{ name: "description", rows: 2 }} />
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Link URL" inputProps={{ name: "link", placeholder: "https://..." }} />
            <FormField label="Sort Order" inputProps={{ name: "sortOrder", type: "number", defaultValue: items.length }} />
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
              Create WIP Item
            </button>
          </div>
        </form>
      ) : null}

      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-(--border) p-4 text-sm text-(--text-secondary)">
          No WIP entries yet.
        </p>
      ) : (
        items.map((item) => (
          <ItemCard
            key={item._id ?? item.name}
            title={item.name}
            subtitle={item.description}
            badges={[item.date || "undated", `order:${item.sortOrder}`]}
          >
            <form action="/api/admin/wip" method="post" className="grid gap-4">
              <input type="hidden" name="id" value={item._id ?? ""} />
              <input type="hidden" name="action" value="update" />
              <div className="grid gap-4 md:grid-cols-2">
                <FormField label="Name" inputProps={{ name: "name", defaultValue: item.name, required: true }} />
                <FormField label="Date label" inputProps={{ name: "date", defaultValue: item.date }} />
              </div>
              <FormField
                type="textarea"
                label="Description"
                textareaProps={{ name: "description", defaultValue: item.description, rows: 2 }}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <FormField label="Link URL" inputProps={{ name: "link", defaultValue: item.link }} />
                <FormField
                  label="Sort Order"
                  inputProps={{ name: "sortOrder", type: "number", defaultValue: item.sortOrder }}
                />
              </div>
              <div className="flex justify-end gap-2">
                {item._id ? (
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
                  Save WIP Item
                </button>
              </div>
            </form>
          </ItemCard>
        ))
      )}
    </div>
  );
}
