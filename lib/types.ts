export type ProjectLinkType = "github" | "website";
export type ProjectVariant = "Short" | "Long";

export interface Project {
  _id?: string;
  name: string;
  description: string;
  link: string;
  linkType: ProjectLinkType;
  recent: boolean;
  categorySlug: string;
  tags: string[];
  icons: string[];
  variant: ProjectVariant;
  featured: boolean;
  descriptionShort: string;
  sortOrder: number;
}

export interface WipProject {
  _id?: string;
  name: string;
  description: string;
  date: string;
  link: string;
  sortOrder: number;
}

export interface ProjectCategory {
  _id?: string;
  slug: string;
  label: string;
  description: string;
  visible: boolean;
  sortOrder: number;
}

export interface SiteContentEntry {
  _id?: string;
  key: string;
  value: string;
  updatedAt?: number;
}
