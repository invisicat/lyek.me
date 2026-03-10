import FormField from "@/components/admin/FormField";

const HOME_FIELDS = [
  { key: "home.heroTitle", label: "Hero Title", rows: 2 },
  { key: "home.subtitle", label: "Subtitle", rows: 2 },
  { key: "home.intro1", label: "Intro Paragraph 1", rows: 3 },
  { key: "home.intro2", label: "Intro Paragraph 2", rows: 3 },
  { key: "home.wipHeading", label: "WIP Heading", rows: 2 },
  { key: "home.projectsHeading", label: "Projects Heading", rows: 2 },
  { key: "home.projectsCtaLabel", label: "Projects CTA Label", rows: 2 },
] as const;

const PROJECT_FIELDS = [
  { key: "projects.pageTitle", label: "Page Title", rows: 2 },
  { key: "projects.badgeRecent", label: "Recent Badge Label", rows: 2 },
  { key: "projects.badgeMobile", label: "Mobile Badge Label", rows: 2 },
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
