import { supabase } from "@/lib/supabaseClient";

/**
 * @function getProjects
 * @returns {Promise<Array>} - A promise that resolves to an array of projects.
 * @description Fetches all projects from the Supabase database.
 */
export const getProjects = async () => {
  const { data, error } = await supabase.from("projects").select();

  if (error) {
    console.error("Error fetching projects:", error);
    return null;
  }

  return { data, error };
};

/**
 *
 * @param {*} project
 * @returns
 */
export const getProjectById = async (id) => {
  const { data, error } = await supabase
    .from("projects")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching project:", error);
    return null;
  }

  return { data, error };
};

/**
 * @function getProjectByCategory
 * @param {*} project
 * @returns
 */
export const getProjectByCategory = async (categoryId) => {
  const { data, error } = await supabase
    .from("projects")
    .select()
    .eq("id-category", categoryId);

  if (error) {
    console.error("Error fetching project by category:", error);
    return null;
  }

  return { data, error };
};

/**
 * @function createProject
 * @description Creates a new project in the Supabase database.
 * @param {*} project
 * @returns
 */

export const createProject = async (project) => {
  const { data, error } = await supabase
    .from("projects")
    .insert(project)
    .select();

  if (error) {
    console.error("Error creating project:", error);
    return null;
  }

  return data;
};

export const updateProject = async (id, project) => {
  console.log("updateProject: ", id, project);
  if (!id) {
    console.error("Project ID is required for update.");
    return null;
  }

  const { data, error } = await supabase
    .from("projects")
    .update(project)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating project:", error);
    return null;
  }

  return { data, error };
};

export const deleteProject = async (id) => {
  if (!id) {
    console.error("Project ID is required for deletion.");
    return null;
  }

  const { data, error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error deleting project:", error);
    return null;
  }

  return { data, error };
};

export const getProjectCount = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select("*", { count: "exact" });

  if (error) {
    console.error("Error fetching project count:", error);
    return null;
  }

  return { count: data.length, error };
};

export async function getProjectsByMonth(year, month) {
  const start = new Date(year, month - 1, 1).toISOString();
  const end = new Date(year, month, 1).toISOString();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .gte("created_at", start)
    .lt("created_at", end);

  if (error) throw error;
  return data;
}

export async function hideProject(id) {
  const { data, error } = await supabase
    .from("projects")
    .update({ is_hidden: true })
    .eq("id", id);

  if (error) throw error;
  return data;
}

export async function unhideProject(id) {
  const { data, error } = await supabase
    .from("projects")
    .update({ is_hidden: false })
    .eq("id", id);

  if (error) throw error;
  return data;
}

export async function getProjectBySlug(slug) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data;
}
export async function getProjectByTitle(title) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("title", title)
    .single();

  if (error) throw error;
  return data;
}

export async function getProjectStatusById(id) {
  const { data, error } = await supabase
    .from("projects")
    .select("is_hidden")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function getProjectsPaginated(page = 1, pageSize = 9) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error, count } = await supabase
    .from("projects")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  return { data, error, count };
}

export async function emptyProjectThumbnail(id) {
  const { data, error } = await supabase
    .from("projects")
    .update({ thumbnail: null })
    .eq("id", id);

  if (error) throw error;
  return data;
}
