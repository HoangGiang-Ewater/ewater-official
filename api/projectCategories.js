import { supabase } from "@/lib/supabaseClient";

const tableName = "project-categories";

/**
 * Fetch a project category by ID from the database.
 * @param {number} id - The ID of the project category to fetch.
 * * @returns {Promise<{ data: Object, error: Object }>} The project category or an error.
 */
export async function fetchProjectCategoryById(id) {
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching project category:", error);
  }

  return { data, error };
}

/**
 * Fetch project categories from the database.
 * @returns {Promise<{ data: Array, error: Object }>} The project categories or an error.
 */
export async function fetchProjectCategories() {
  const { data, error } = await supabase
    .from(tableName)
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
  return supabase.from(tableName).insert(category).select();
}

/**
 * Delete a project category from the database
 *  * @param {number} id - The ID of the project category to delete.
 * * @returns {Promise<{ data: Object, error: Object }>} The deleted project category or an error.
 *
 */
export async function deleteProjectCategory(id) {
  return supabase.from(tableName).delete().eq("id", id).select();
}

/**
 * Update a project category in the database.
 * @param {number} id - The ID of the project category to update.
 * @param {Object} category - The updated project category data.
 * @returns {Promise<{ data: Object, error: Object }>} The updated project category or an error.
 */
export async function updateProjectCategory(id, category) {
  return supabase.from(tableName).update(category).eq("id", id).select();
}

/**
 * Get the count of all project categories in the database.
 * @returns {Promise<{ count: number, error: Object }>} The count of project categories or an error.
 */
export async function getProjectCategoryCount() {
  const { count, error } = await supabase
    .from(tableName)
    .select("*", { count: "exact" });

  if (error) {
    console.error("Error fetching project category count:", error);
  }

  return { count, error };
}

/**
 * Get the count of projects in a specific category.
 * @param {number} categoryId - The ID of the project category.
 * @returns {Promise<{ count: number, error: Object }>} The count of projects in the category or an error.
 */

export async function getProjectCountByCategory(categoryId) {
  const { count, error } = await supabase
    .from("projects")
    .select("*", { count: "exact" })
    .eq("category_id", categoryId)
    .eq("category_id", categoryId);
  if (error) {
    console.error("Error fetching project count by category:", error);
  }

  return { count, error };
}

/**
 * Get project categories count by created date (month).
 * @param {number} year - The year to filter by.
 * @param {number} month - The month to filter by.
 * @returns {Promise<{ data: Array, error: Object }>} The project categories or an error.
 */

export async function getProjectCategoriesByMonth(year, month) {
  const start = new Date(year, month - 1, 1).toISOString();
  const end = new Date(year, month, 1).toISOString();

  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .gte("created_at", start)
    .lt("created_at", end);

  if (error) {
    console.error("Error fetching project categories by month:", error);
  }

  return data;
}

/**
 * Fetch paginated project categories with project count for each.
 * @param {Object} options
 * @param {number} options.page - The page number (1-based).
 * @param {number} options.pageSize - The number of items per page.
 * @returns {Promise<{ data: Array, error: Object, count: number }>}
 */
export async function fetchPaginatedProjectCategoriesWithCount({
  page = 1,
  pageSize = 10,
} = {}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from(tableName)
    .select("*, projects(count)", { count: "exact" })
    .order("id", { ascending: true })
    .range(from, to);

  if (error) {
    console.error(
      "Error fetching paginated project categories with count:",
      error
    );
  }

  // Map to flatten the count for easier use
  const categories =
    data?.map((cat) => ({
      ...cat,
      projects_count: cat.projects?.[0]?.count ?? 0,
    })) ?? [];

  return { data: categories, error, count: count ?? 0 };
}
