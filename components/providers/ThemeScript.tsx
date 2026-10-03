export default function ThemeScript() {
  const script = `
    (function() {
      let theme = "dark";
      try {
        theme = localStorage.getItem("theme") || "dark";
      } catch {}
      const root = document.documentElement;
      const setTheme = function(mode) {
        if (mode === "dark") {
          root.classList.add("dark");
        } else if (mode === "light") {
          root.classList.remove("dark");
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      };
      setTheme(theme);
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
