import { supabase } from "@/lib/supabaseClient";

/**
 * @function submitContactForm
 * @description Submits the contact form data to the server.
 * @param {Object} data - The form data to be submitted.
 * @param {string} data.fullname - The full name of the user.
 * @param {string} data.email - The email address of the user.
 * @param {string} data.message - The service description provided by the user.
 * @returns {Promise<void>} - A promise that resolves when the form submission is complete.
 * @throws {Error} - Throws an error if the form submission fails.
 *
 */

export async function submitContactForm(contactData) {
  console.log("Submitting contact form with data:", contactData);

  const { data, error } = await supabase
    .from("contacts")
    .insert(contactData)
    .select("*");

  console.log("Contact form submission response:", data, error);

  return {
    data,
    error,
  };
}

/**
 * @function getContactList
 * @description Fetches the list of contacts from the server.
 * @param {number} page - The page number to fetch.
 * @param {number} pageSize - The number of contacts per page.
 * @return {Promise<Object>} - A promise that resolves to an object containing the list of contacts and the total count.
 * @throws {Error} - Throws an error if the fetch operation fails.
 *
 * @typedef {Object} Contact
 * @property {number} id - The unique identifier of the contact.
 * @property {string} fullname - The full name of the contact.
 * @property {string} email - The email address of the contact.
 * @property {string} message - The message provided by the contact.
 * @property {string} created_at - The timestamp when the contact was created.
 * @property {string} updated_at - The timestamp when the contact was last updated.
 * @typedef {Object} ContactListResponse
 * @property {Contact[]} data - The list of contacts.
 * @property {number} count - The total number of contacts.
 *
 * @example
 *
 * const { data, error } = await getContactList(1, 10);
 * if (error) {
 *   console.error("Error fetching contacts:", error);
 * }
 * console.log("Contact list:", data);
 */

export async function getContactList(page = 1, pageSize = 10) {
  const from = (page - 1) * pageSize;
  const to = page * pageSize - 1;

  const { data, error, count } = await supabase
    .from("contacts")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching contacts:", error);
    throw new Error("Failed to fetch contacts");
  }

  return {
    data,
    count: count ?? 0,
  };
}

/**
 * @function getContactListByStatus
 * @description Fetches contacts by their status.
 * @param {string} status - The status of the contacts to fetch ("new", "archived", "replied").
 * @return {Promise<Object>} - A promise that resolves to an object containing the list of contacts with the specified status.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
export async function getContactListByStatus(page, pageSize, status) {
  const from = (page - 1) * pageSize;
  const to = page * pageSize - 1;

  console.log("Fetching contacts with status:", status);

  const { data, error, count } = await supabase
    .from("contacts")
    .select("*", { count: "exact" })
    .eq("status", status)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching contacts by status:", error);
    throw new Error(`Failed to fetch contacts with status: ${status}`);
  }

  return {
    data,
    error,
    count: count ?? 0,
  };
}

/**
 * @function deleteContact
 * @description Deletes a contact by its ID.
 * @param {number} id - The ID of the contact to delete.
 * @return {Promise<void>} - A promise that resolves when the contact is deleted.
 * @throws {Error} - Throws an error if the deletion fails.
 * @example
 *
 * const { error } = await deleteContact(123);
 * if (error) {
 *   console.error("Error deleting contact:", error);
 * }
 * console.log("Contact deleted successfully");
 *
 */

export async function deleteContact(id) {
  console.log("Deleting contact with ID:", id);

  const { error } = await supabase.from("contacts").delete().eq("id", id);

  if (error) {
    console.error("Error deleting contact:", error);
    throw new Error("Failed to delete contact");
  }

  console.log("Contact deleted successfully");
}

/**
 * @function updateContactStatus
 * @description Updates the status of a contact by its ID.
 * @param {number} id - The ID of the contact to update.
 * @param {string} status - The new status to set for the contact.
 * @return {Promise<void>} - A promise that resolves when the contact status is updated.
 * @throws {Error} - Throws an error if the update fails.
 * @example
 *
 * const { error } = await updateContactStatus(123, "archived");
 * if (error) {
 *   console.error("Error updating contact status:", error);
 * }
 * console.log("Contact status updated successfully");
 */

export async function updateContactStatus(id, status) {
  console.log("Updating contact status for ID:", id, "to status:", status);

  const { error } = await supabase
    .from("contacts")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Error updating contact status:", error);
    throw new Error("Failed to update contact status");
  }

  console.log("Contact status updated successfully");
}

/**
 * @function updateContactDetails
 * @description Updates the details of a contact by its ID.
 * @param {number} id - The ID of the contact to update.
 * @param {Object} details - The new details to set for the contact.
 * @param {string} details.status - The status of the contact.
 * @param {string} details.note - The note of the contact.
 * @return {Promise<void>} - A promise that resolves when the contact details are updated.
 * @throws {Error} - Throws an error if the update fails.
 * @example
 * const { error } = await updateContactDetails(123, {
 * * status: "replied",
 * * note: "Replied to the contact",
 * });
 * if (error) {
 * * console.error("Error updating contact details:", error);
 * }
 * console.log("Contact details updated successfully");
 */
export async function updateContactDetails(id, details) {
  console.log("Updating contact details for ID:", id, "with details:", details);

  const { error } = await supabase
    .from("contacts")
    .update(details)
    .eq("id", id);

  if (error) {
    console.error("Error updating contact details:", error);
    throw new Error("Failed to update contact details");
  }

  console.log("Contact details updated successfully");
  return { error };
}

/**
 * @function getContactById
 * @description Fetches a contact by its ID.
 * @param {number} id - The ID of the contact to fetch.
 * @return {Promise<Object>} - A promise that resolves to the contact data.
 * @throws {Error} - Throws an error if the fetch operation fails.
 * @example
 * const { data, error } = await getContactById(123);
 * if (error) {
 *  console.error("Error fetching contact:", error);
 * }
 * console.log("Contact data:", data);
 */

export async function getContactById(id) {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching contact:", error);
    throw new Error("Failed to fetch contact");
  }

  return { data, error };
}
