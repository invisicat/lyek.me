import Link from "next/link";
import { requireAdminSession } from "@/lib/adminAuth";

export default async function AdminProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAdminSession();

  return (
    <div className="flex flex-col gap-6">
      <header className="relative overflow-hidden rounded-2xl border border-(--border) bg-(--bg-surface)/40 p-5 md:p-6">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_85%_0%,var(--accent),transparent_42%)]" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-(--text-tertiary) uppercase">
              Content Studio
            </p>
            <h1 className="mt-2 font-serif text-4xl md:text-5xl">CMS Admin</h1>
            <p className="mt-2 max-w-xl text-sm text-(--text-secondary)">
              Edit homepage and projects page copy, manage categories, and curate
              project/WIP ordering.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-lg border border-(--border) px-3 py-2 text-sm transition-colors hover:border-(--accent) hover:text-(--accent)"
            >
              View site
            </Link>
            <form action="/api/admin/logout" method="post">
              <button
                type="submit"
                className="rounded-lg border border-(--border) px-3 py-2 text-sm transition-colors hover:border-(--accent) hover:text-(--accent)"
              >
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mb-2 flex items-center justify-between border-b border-(--border) pb-2">
        <p className="font-mono text-xs tracking-wide text-(--text-tertiary) uppercase">
          Admin Workspace
        </p>
        <p className="text-xs text-(--text-tertiary)">
          Changes save immediately through server actions
        </p>
      </div>

      <div>{children}</div>
    </div>
  );
}
