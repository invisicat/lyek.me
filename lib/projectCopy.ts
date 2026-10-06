import type { Project } from "@/lib/types";

interface LegacyCopy {
  name?: string;
  descriptions: readonly string[];
  description: string;
}

const legacyCopy: Readonly<Record<string, LegacyCopy>> = {
  "Frostless Network": {
    descriptions: [
      "My Minecraft server with over 200+ members. Self maintained infra with Docker, Grafana, Pterodactyl etc.",
    ],
    description: "A Minecraft network with self-managed infrastructure.",
  },
  "Stanford CamSA": {
    descriptions: [
      "Website for Stanford's Cambodian Student Association. Built with HTML/CSS.",
    ],
    description: "Website for Stanford's Cambodian Student Association.",
  },
  KeepIt: {
    descriptions: ["iOS app that keeps track of your reels"],
    description: "An iOS app for keeping track of reels.",
  },
  Nozuru: {
    descriptions: [
      "A simple, fast, and efficient backend service used to build artifacts and serve Javadocs. Made with Rust 🦀.",
      "Backend service for building artifacts and serving Javadocs",
    ],
    description: "An early Rust prototype for downloading Spigot BuildTools.",
  },
  "Custom Reflection Listeners": {
    name: "Generic Listeners",
    descriptions: [
      "Example implementation of reflection to dynamically register events with generic parameters as event handlers",
      "Dynamic event registration system using reflection for Minecraft",
    ],
    description: "An example of registering generic Minecraft event listeners.",
  },
  "Simple UDP Network": {
    name: "UDP Echo Server",
    descriptions: [
      "Echo server implementation that echoes back the packets it receives to the client",
      "Basic UDP echo server implementation",
    ],
    description: "A UDP server that echoes packets back to clients.",
  },
  LogSnag4J: {
    descriptions: [
      "Wrapper for LogSnag that allows for easy integration with Java applications",
      "Java wrapper for LogSnag integration",
    ],
    description: "A Java wrapper for LogSnag.",
  },
  "Discord Velocity Sync": {
    descriptions: [
      "Lightweight Velocity plugin that syncs Discord roles with in-game roles.",
      "Discord role synchronization for Minecraft servers",
    ],
    description: "Syncs Discord roles with Minecraft server roles.",
  },
  "Webstore Scraper": {
    name: "Stock Tracker",
    descriptions: [
      "App that scraped Bestbuy's website for RTX 3080s. Utilized a scaper, webhooks, and cron jobs.",
      "BestBuy RTX 3080 stock tracker with webhooks",
    ],
    description: "Tracked RTX 3080 availability at Best Buy.",
  },
  "Axolotl Ponds": {
    descriptions: [
      "MMORPG Minecraft plugin that allows you to create ponds for axolotls to spawn in.",
    ],
    description: "A Minecraft plugin for creating axolotl spawning ponds.",
  },
  Sprinkl: {
    descriptions: ["Native macOS Pomodoro app built with Swift, lock in"],
    description: "A native macOS Pomodoro timer.",
  },
  PvPToggle: {
    descriptions: ["Minecraft plugin that toggles prevents combat logging"],
    description: "Toggle Minecraft PvP with persistent preferences and cooldowns.",
  },
};

export function getProjectCopy(project: Project): Project {
  const copy = Object.hasOwn(legacyCopy, project.name) ? legacyCopy[project.name] : undefined;
  if (!copy) return project;

  // A stale short description must not override newly edited CMS copy.
  const description = project.description.trim() || project.descriptionShort.trim();
  if (!copy.descriptions.includes(description)) return project;

  return {
    ...project,
    name: copy.name ?? project.name,
    description: copy.description,
  };
}
