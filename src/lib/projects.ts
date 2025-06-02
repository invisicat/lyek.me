export type ProjectProps = {
  title: string;
  description: string;
  description_short?: string;
  link: string;
  link_type?: "github" | "website";
  minecraft?: boolean;
  icons: string[];
  recent?: boolean;
  project_type: "general" | "web" | "game";
  tags?: string[];
  variant: "long" | "short";
};

export const Projects: ProjectProps[] = [
  {
    title: "RiceStats",
    link: "https://github.com/invisicat/RiceStats",
    link_type: "github",
    icons: ["hugeicons:java", "devicon-plain:grafana-wordmark"],
    description:
      "Tracks Minecraft statistics with InfluxDB for timescale analytics as a Spigot plugin",
    description_short:
      "Tracks Minecraft statistics with InfluxDB for timescale analytics as a Spigot plugin",
    project_type: "game",
    variant: "short",
  },
  {
    title: "Nozuru",
    link: "https://github.com/invisicat/Nozuru",
    icons: ["hugeicons:java"],
    description:
      "A simple, fast, and efficient backend service used to build artifacts and serve Javadocs. Made with Rust 🦀.",
    description_short:
      "Backend service for building artifacts and serving Javadocs",
    project_type: "general",
    variant: "short",
  },
  {
    title: "Custom Reflection Listeners",
    link: "https://github.com/invisicat/BukkitGenericListeners",
    icons: ["hugeicons:java"],
    minecraft: true,
    description:
      "Example implementation of how you're able to use reflection to dynamically register all events which allow you to use generic parameters as event handlers",
    description_short:
      "Dynamic event registration system using reflection for Minecraft",
    project_type: "game",
    variant: "short",
  },
  {
    title: "Simple UDP Network",
    link: "https://github.com/invisicat/SimpleUdpNetwork",
    icons: ["hugeicons:java"],
    description:
      "Simple echo server implementation that listens on a port and echoes back the packets it receives to the client that sent it",
    description_short: "Basic UDP echo server implementation",
    project_type: "general",
    variant: "short",
  },
  {
    title: "LogSnag4J",
    link: "https://github.com/invisicat/LogSnag4J",
    icons: ["hugeicons:java"],
    description:
      "Wrapper for LogSnag that allows for easy integration with Java applications",
    description_short: "Java wrapper for LogSnag integration",
    project_type: "general",
    variant: "short",
  },
  {
    title: "Discord Velocity Sync",
    link: "https://github.com/invisicat/DiscordVelocitySync",
    icons: ["hugeicons:java"],
    minecraft: true,
    description:
      "Lightweight Velocity plugin that syncs Discord roles with in-game roles.",
    description_short: "Discord role synchronization for Minecraft servers",
    project_type: "game",
    variant: "short",
  },
  {
    title: "Webstore Scraper",
    link: "https://github.com/invisicat/rust-bestbuy-scraper",
    icons: ["devicon-plain:rust", "mdi:database"],
    description:
      "App that scraped Bestbuy's website for RTX 3080s. Utilized a scaper, webhooks, and cron jobs. ",
    description_short: "BestBuy RTX 3080 stock tracker with webhooks",
    project_type: "web",
    variant: "short",
  },
  {
    title: "Frostless Network",
    link: "https://frostless.network",
    link_type: "website",
    icons: [""],
    recent: true,
    description:
      "A network of servers that are used to host various services. Currently, it's used to host a Minecraft server, a Discord bot, and a website.",
    project_type: "game",
    variant: "long",
  },
  {
    title: "Stanford CamSA",
    link: "https://camsa.vercel.app",
    link_type: "website",
    icons: ["devicon-plain:react"],
    recent: true,
    description:
      "Website for Stanford's Cambodian Student Association. Built with HTML/CSS.",
    project_type: "web",
    variant: "short",
  },
  {
    title: "Axolotl Ponds",
    link: "https://github.com/invisicat/AxolotlPonds",
    link_type: "github",
    icons: ["hugeicons:java"],
    description:
      "MMORPG Minecraft plugin that allows you to create ponds for axolotls to spawn in.",
    project_type: "game",
    variant: "short",
  },
  {
    title: "Sprinkl",
    link: "https://github.com/invisicat/Sprinkl",
    link_type: "github",
    icons: ["hugeicons:swift"],
    recent: true,
    description: "Native macOS Pomodoro app built with Swift, lock in",
    project_type: "general",
    variant: "short",
  },
  {
    title: "KeepIt",
    link: "https://github.com/invisicat/KeepIt",
    link_type: "github",
    icons: ["hugeicons:swift"],
    recent: true,
    tags: ["iOS", "Swift", "mobile"],
    description: "iOS app that keeps track of your reels",
    project_type: "general",
    variant: "short",
  },
  {
    title: "PvPToggle",
    link: "https://github.com/invisicat/PvPToggle",
    link_type: "github",
    icons: ["hugeicons:java"],
    description: "Minecraft plugin that toggles prevents combat logging",
    project_type: "game",
    variant: "short",
  },
];
