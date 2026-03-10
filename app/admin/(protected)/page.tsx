import AdminDashboard from "@/components/admin/AdminDashboard";
import { DEFAULT_CATEGORIES, mergeSiteContent } from "@/lib/cmsDefaults";
import { getProjectCategories, getProjects, getSiteContentEntries, getWipProjects } from "@/lib/convex";

type Props = {
  searchParams: Promise<{ saved?: string; error?: string }>;
};

export default async function AdminPage({ searchParams }: Props) {
  const params = await searchParams;
  const [projects, wip, categoriesRaw, contentRaw] = await Promise.all([
    getProjects(),
    getWipProjects(),
    getProjectCategories(),
    getSiteContentEntries(),
  ]);

  const categories =
    categoriesRaw.length > 0
      ? [...categoriesRaw].sort((a, b) => a.sortOrder - b.sortOrder)
      : DEFAULT_CATEGORIES;
  const editableCategories = [...categoriesRaw].sort((a, b) => a.sortOrder - b.sortOrder);
  const content = mergeSiteContent(contentRaw);

  return (
    <AdminDashboard
      content={content}
      categories={categories}
      editableCategories={editableCategories}
      projects={projects}
      wip={wip}
      flash={{ saved: params.saved, error: params.error }}
    />
  );
}
