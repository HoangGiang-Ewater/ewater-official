import { supabase } from "@/lib/supabaseClient";

/**
 * Fetch project categories from the database.
 * @returns {Promise<{ data: Array, error: Object }>} The project categories or an error.
 */
export async function fetchProjectCategories() {
  const { data, error } = await supabase
    .from("project-categories")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching project categories:", error);
  }

  return { data, error };
}

/**
 * Create a new project category in the database.
 * @param {string} name - The name of the project category.
 * @param {string} description - The description of the project category.
 * @param {string} image - The image URL of the project category.
 *
 * @returns {Promise<{ data: Object, error: Object }>} The created project category or an error.
 *
 */
export async function createProjectCategory(category) {
  return supabase.from("project-categories").insert(category).select();
}

/**
 * Delete a project category from the database
 *  * @param {number} id - The ID of the project category to delete.
 * * @returns {Promise<{ data: Object, error: Object }>} The deleted project category or an error.
 *
 */
export async function deleteProjectCategory(id) {
  return supabase.from("project-categories").delete().eq("id", id).select();
}
