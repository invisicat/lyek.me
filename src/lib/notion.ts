import { Client } from "@notionhq/client";

const notion = new Client({
  auth: import.meta.env.NOTION_API_KEY,
});

const DATABASE_ID = import.meta.env.NOTION_DATABASE_ID;

export type ProjectType = "general" | "web" | "game";

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
  link_type: "github" | "website";
  recent: boolean;
  project_type: ProjectType;
  tags: string[];
  icons: string[];
  variant: "Short" | "Long";
  featured: boolean;
  description_short: string;
}

export async function getProjects(): Promise<Project[]> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID!,
    });

    return response.results.map((page: any) => {
      const properties = page.properties;
      return {
        id: page.id,
        name: properties.Name.title[0]?.plain_text || "",
        description: properties.Description.rich_text[0]?.plain_text || "",
        link: properties.Link.url || "",
        link_type: properties.link_type.select?.name || "github",
        recent: properties.Recent.checkbox || false,
        project_type: properties.project_type.select?.name || "general",
        tags: properties.tags.multi_select.map((tag: any) => tag.name),
        icons: properties.icons.rich_text[0]?.plain_text?.split(";") || [],
        variant: properties.Variant.select?.name || "Short",
        description_short:
          properties.description_short.rich_text[0]?.plain_text || "",
        featured: properties.featured.checkbox || false,
      };
    });
  } catch (error) {
    console.error("Error fetching projects from Notion:", error);
    return [];
  }
}
