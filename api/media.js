/**
 * @function getMediaFromBucket
 * @description Fetches media from a specified bucket in the S3 storage.
 * @param {string} bucket - The name of the bucket to fetch media from.
 * @param {string} [prefix] - Optional prefix to filter the media.
 * @returns {Promise<Array>} - A promise that resolves to an array of media objects.
 * @throws {Error} - Throws an error if the fetch operation fails.
 *
 * @example
 * const { data, error } = await getMediaFromBucket("my-bucket", "images/");
 * if (error) {
 *   console.error("Error fetching media:", error);
 * }
 * // console.log("Fetched media:", data);
 */

import { supabase } from "@/lib/supabaseClient";

export async function getMediaFromBucket(bucket, prefix) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(prefix || "", {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });

  return {
    data,
    error,
  };
}

/**
 * Fetch paginated files from a bucket and return their public URLs.
 * @param {string} bucket - The bucket name.
 * @param {object} options - { prefix, page, pageSize }
 * @returns {Promise<{data: Array, error: any, total: number}>}
 */

export async function getPaginatedMediaFromBucket(
  bucket,
  { prefix = "", page = 1, pageSize = 20 } = {}
) {
  const offset = (page - 1) * pageSize;
  const { data, error } = await supabase.storage.from(bucket).list(prefix, {
    limit: pageSize,
    offset,
    sortBy: { column: "name", order: "asc" },
  });

  if (error) return { data: [], error, total: 0 };

  // Get total count
  let total = 0;
  const allFilesRes = await supabase.storage.from(bucket).list(prefix, {
    limit: 1000,
    offset: 0,
  });
  if (allFilesRes.data) total = allFilesRes.data.length;

  // Ensure prefix ends with "/" if present and not empty
  const normalizedPrefix =
    prefix && !prefix.endsWith("/") ? `${prefix}/` : prefix;

  // Reconstruct the full file path for publicUrl and check if it is valid
  const filesWithUrls = (data || [])
    .filter((file) => file.metadata)
    .map((file) => {
      const filePath = normalizedPrefix
        ? `${normalizedPrefix}${file.name}`
        : file.name;
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      // console.log("filePath: ", filePath);
      // console.log("publicUrl: ", urlData.publicUrl);
      return {
        ...file,
        publicUrl: urlData.publicUrl || null,
        filePath,
      };
    })
    .filter((file) => !!file.publicUrl); // Only keep files with a valid publicUrl

  return { data: filesWithUrls, error: null, total };
}

/**
 * @function deleteFileFromBucket
 * @description Deletes a file from a specified bucket in the S3 storage.
 * @param {string} bucket - The name of the bucket to delete the file from.
 * @param {string} filePath - The path of the file to delete.
 * @returns {Promise<void>} - A promise that resolves when the file is deleted.
 * @throws {Error} - Throws an error if the delete operation fails.
 *
 * @example
 * await deleteFileFromBucket("my-bucket", "images/photo.jpg");
 * if (error) {
 *  console.error("Error deleting file:", error);
 * }
 * // console.log("File deleted successfully");
 */

export async function deleteFileFromBucket(filePath) {
  const { error } = await supabase.storage
    .from("project-media")
    .remove([filePath]);
  if (error) {
    console.error("Error deleting file:", error);
  } else {
    queryClient.invalidateQueries(["media"]);
  }
  return { error };
}
