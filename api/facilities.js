import { supabase } from "@/lib/supabaseClient";

const tableName = "facilities";

/**
 * @function getFacilities
 * @description Fetches the list of facilities from the server.
 * @returns {Promise} A promise that resolves to the list of facilities.
 *
 */

export async function getFacilities() {
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
 * Get a facility by ID from the database.
 * @param {number} id - The ID of the project category to fetch.
 * * @returns {Promise<{ data: Object, error: Object }>} The project category or an error.
 */
export async function getFacilityById(id) {
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching facility with id ${id} :`, error);
  }

  return { data, error };
}

/**
 * Get paginated facilities from the database.
 * @param {number} page - The page number to fetch.
 * @param {number} pageSize - The number of items per page.
 * @returns {Promise<{ data: Array, error: Object }>} The paginated facilities or an error.
 */

export async function getPaginatedFacilities(page, pageSize) {
  const { data, error, count } = await supabase
    .from(tableName)
    .select("*", { count: "exact" })
    .range((page - 1) * pageSize, page * pageSize - 1)
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching paginated facilities:", error);
  }

  return { data, error, count };
}

/**
 * Create a new facility in the database.
 * @param {string} name - The name of the facility.
 * @param {string} description - The description of the facility.
 * @param {number} amount - The amount of the facility.
 * @returns {Promise<{ data: Object, error: Object }>} The created facility or an error.
 */
export async function createFacility(facility) {
  return supabase.from(tableName).insert(facility).select();
}

/**
 * Update a facility in the database.
 * @param {number} id - The ID of the facility to update.
 * @param {Object} facility - The updated facility data.
 * @returns {Promise<{ data: Object, error: Object }>} The updated facility or an error.
 */

export async function updateFacility(id, facility) {
  return supabase.from(tableName).update(facility).eq("id", id).select();
}

/**
 * Delete a facility from the database
 *  * @param {number} id - The ID of the facility to delete.
 * * @returns {Promise<{ data: Object, error: Object }>} The deleted facility or an error.
 *
 */

export async function deleteFacility(id) {
  return supabase.from(tableName).delete().eq("id", id).select();
}
