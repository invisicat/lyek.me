import type { APIRoute } from "astro";
import { getProjects } from "../../lib/notion";

export const GET: APIRoute = async () => {
  try {
    const projects = await getProjects();
    return new Response(JSON.stringify(projects), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch projects" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
