export type ProjectProps = {
  title: string;
  description: string;
  link: string;
  minecraft?: boolean;
  icons: string[];
};

export const Projects: ProjectProps[] = [
  {
    title: "RiceStats",
    link: "https://github.com/invisicat/RiceStats",
    icons: ["hugeicons:java", "devicon-plain:grafana-wordmark"],
    description:
      "Tracks Minecraft statistics with InfluxDB for timescale analytics as a Spigot plugin",
  },
  {
    title: "Nozuru",
    link: "https://github.com/invisicat/Nozuru",
    icons: ["hugeicons:java"],
    description:
      "A simple, fast, and efficient backend service used to build artifacts and serve Javadocs. Made with Rust 🦀.",
  },
  {
    title: "Custom Reflection Listeners",
    link: "https://github.com/invisicat/BukkitGenericListeners",
    icons: ["hugeicons:java"],
    minecraft: true,
    description:
      "Example implementation of how you're able to use reflection to dynamically register all events which allow you to use generic parameters as event handlers",
  },
  {
    title: "Simple UDP Network",
    link: "https://github.com/invisicat/SimpleUdpNetwork",
    icons: ["hugeicons:java"],
    description:
      "Simple echo server implementation that listens on a port and echoes back the packets it receives to the client that sent it",
  },
  {
    title: "LogSnag Wrapper",
    link: "https://github.com/invisicat/LogSnag4J",
    icons: ["hugeicons:java"],
    description:
      "Wrapper for LogSnag that allows for easy integration with Java applications",
  },
  {
    title: "Discord Velocity Sync",
    link: "https://github.com/invisicat/DiscordVelocitySync",
    icons: ["hugeicons:java"],
    minecraft: true,
    description:
      "Lightweight Velocity plugin that syncs Discord roles with in-game roles.",
  },
  {
    title: "Axolotl Ponds",
    link: "https://github.com/invisicat/AxolotlPonds",
    icons: ["hugeicons:java"],
    minecraft: true,
    description:
      "A Minecraft plugin for MMORPG that allows you to create ponds for axolotls to spawn in.",
  }
];