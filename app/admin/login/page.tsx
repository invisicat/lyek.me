import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login - Andy Lyek",
};

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const params = await searchParams;
  const message =
    params.error === "invalid"
      ? "Incorrect passcode."
      : params.error === "server"
        ? "Login failed due to server configuration."
        : null;

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center">
      <div className="rounded-2xl border border-(--border) bg-(--bg-surface)/50 p-6 md:p-7">
        <p className="font-mono text-xs tracking-[0.18em] text-(--text-tertiary) uppercase">CMS Access</p>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl">Admin</h1>
        <p className="mt-3 text-sm text-(--text-secondary)">
          Sign in to manage projects, categories, WIP entries, and page copy.
        </p>

        <form action="/api/admin/login" method="post" className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm">
            <span className="text-xs font-medium tracking-wide text-(--text-secondary) uppercase">Passcode</span>
            <input
              type="password"
              name="passcode"
              required
              className="rounded-lg border border-(--border) bg-(--bg) px-3 py-2 outline-none transition-all duration-200 focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20"
            />
          </label>

          {message ? <p className="text-sm text-red-400">{message}</p> : null}

          <button
            type="submit"
            className="rounded-lg border border-(--accent) bg-(--accent) px-4 py-2 text-sm font-medium text-(--bg) transition-opacity hover:opacity-90"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
