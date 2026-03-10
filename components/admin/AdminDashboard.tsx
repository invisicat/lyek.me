"use client";

import { useEffect, useMemo, useState } from "react";
import CategoryManager from "@/components/admin/CategoryManager";
import ContentEditor from "@/components/admin/ContentEditor";
import ProjectManager from "@/components/admin/ProjectManager";
import WipManager from "@/components/admin/WipManager";
import type { Project, ProjectCategory, WipProject } from "@/lib/types";

type TabId = "content" | "categories" | "projects" | "wip";

interface Props {
  content: Record<string, string>;
  categories: ProjectCategory[];
  editableCategories: ProjectCategory[];
  projects: Project[];
  wip: WipProject[];
  flash?: {
    saved?: string;
    error?: string;
  };
}

export default function AdminDashboard({
  content,
  categories,
  editableCategories,
  projects,
  wip,
  flash,
}: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("content");
  const [showFlash, setShowFlash] = useState(Boolean(flash?.saved || flash?.error));

  useEffect(() => {
    if (!showFlash) {
      return;
    }
    const timer = setTimeout(() => setShowFlash(false), 3000);
    return () => clearTimeout(timer);
  }, [showFlash]);

  const tabs = useMemo(
    () => [
      { id: "content" as const, label: "Content", count: Object.keys(content).length },
      { id: "categories" as const, label: "Categories", count: editableCategories.length },
      { id: "projects" as const, label: "Projects", count: projects.length },
      { id: "wip" as const, label: "WIP", count: wip.length },
    ],
    [content, editableCategories.length, projects.length, wip.length],
  );

  return (
    <div className="grid gap-6 pb-24">
      {showFlash && flash?.saved ? (
        <p className="admin-toast border-green-500/40 bg-green-500/10 text-green-300">
          Saved {flash.saved}.
        </p>
      ) : null}
      {showFlash && flash?.error ? (
        <p className="admin-toast border-red-500/40 bg-red-500/10 text-red-300">
          Failed to update {flash.error}. Check server logs.
        </p>
      ) : null}

      <div className="rounded-xl border border-(--border) bg-(--bg-surface)/50 p-2">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={[
                "rounded-lg border px-3 py-2 text-left transition-all duration-200",
                activeTab === tab.id
                  ? "border-(--accent) bg-(--accent)/15 text-(--text)"
                  : "border-transparent text-(--text-secondary) hover:border-(--border) hover:text-(--text)",
              ].join(" ")}
            >
              <p className="font-medium">{tab.label}</p>
              <p className="font-mono text-xs text-(--text-tertiary)">{tab.count}</p>
            </button>
          ))}
        </div>
      </div>

      <section className="rounded-2xl border border-(--border) bg-(--bg-surface)/30 p-4 md:p-5">
        {activeTab === "content" ? <ContentEditor content={content} /> : null}
        {activeTab === "categories" ? (
          <CategoryManager categories={editableCategories} fallbackCategoryCount={categories.length} />
        ) : null}
        {activeTab === "projects" ? (
          <ProjectManager projects={projects} categories={categories} />
        ) : null}
        {activeTab === "wip" ? <WipManager items={wip} /> : null}
      </section>
    </div>
  );
}
