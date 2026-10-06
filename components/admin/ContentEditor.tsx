import FormField from "@/components/admin/FormField";

const HOME_FIELDS = [
  { key: "home.heroTitle", label: "Greeting", rows: 2 },
  { key: "home.intro1", label: "Introduction", rows: 3 },
  { key: "home.subtitle", label: "Interests", rows: 2 },
  { key: "home.experience", label: "Previous Roles", rows: 3 },
  { key: "home.wipHeading", label: "Current Update Heading", rows: 2 },
  { key: "home.intro2", label: "Current Update", rows: 3 },
  { key: "home.projectsHeading", label: "Projects Introduction", rows: 2 },
  {
    key: "home.featuredProjects",
    label: "Homepage Projects",
    rows: 2,
    hint: "Comma-separated names in display order. Leave empty to use projects marked Featured on home.",
  },
  { key: "home.projectIcsSummary", label: "ICS Filter Summary", rows: 2 },
  { key: "home.projectRiceStatsSummary", label: "RiceStats Summary", rows: 2 },
  { key: "home.projectTag2meSummary", label: "tag2me Summary", rows: 2 },
  { key: "home.projectsCtaLabel", label: "Projects CTA Label", rows: 2 },
] as const;

const PROJECT_FIELDS = [
  { key: "projects.pageTitle", label: "Page Title", rows: 2 },
  { key: "projects.intro", label: "Introduction", rows: 2 },
  { key: "projects.selectedHeading", label: "Selected Projects Heading", rows: 2 },
] as const;

interface Props {
  content: Record<string, string>;
}

export default function ContentEditor({ content }: Props) {
  return (
    <form action="/api/admin/content" method="post" className="grid gap-6">
      <section className="rounded-xl border border-(--border) bg-(--bg-surface)/40 p-4">
        <h3 className="mb-4 font-serif text-xl">Home Page Copy</h3>
        <div className="grid gap-4">
          {HOME_FIELDS.map((field) => (
            <FormField
              key={field.key}
              type="textarea"
              label={field.label}
              hint={"hint" in field ? field.hint : undefined}
              textareaProps={{
                name: `content:${field.key}`,
                defaultValue: content[field.key] ?? "",
                rows: field.rows,
              }}
            />
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-(--border) bg-(--bg-surface)/40 p-4">
        <h3 className="mb-4 font-serif text-xl">Projects Page Copy</h3>
        <div className="grid gap-4">
          {PROJECT_FIELDS.map((field) => (
            <FormField
              key={field.key}
              type="textarea"
              label={field.label}
              textareaProps={{
                name: `content:${field.key}`,
                defaultValue: content[field.key] ?? "",
                rows: field.rows,
              }}
            />
          ))}
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-lg border border-(--accent) bg-(--accent) px-4 py-2 text-sm font-medium text-(--bg) transition-opacity hover:opacity-90"
        >
          Save Content
        </button>
      </div>
    </form>
  );
}
