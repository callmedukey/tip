import path from "path";

export function getExtensionAdvanced(filename: string) {
  if (!filename) return "";

  // Handle path-like strings and normalize them
  const normalizedPath = filename.replace(/\\/g, "/");

  // Get the base filename in case a path is provided
  const basename = normalizedPath.split("/").pop();

  // Handle special cases
  if (basename?.startsWith(".") && !basename?.includes(".", 1)) {
    // Files like .gitignore
    return "";
  }

  if (!basename) return "";
  const extension = path.extname(basename).toLowerCase();

  // Remove the dot from the extension
  return extension.slice(1);
}
