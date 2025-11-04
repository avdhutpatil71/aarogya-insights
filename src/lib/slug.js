// Utility function to create URL-friendly slugs
export function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim() // Remove leading/trailing spaces
}

// Utility function to extract ID from slug
export function extractIdFromSlug(slug) {
  // Check if slug contains ObjectId pattern at the end (after last hyphen)
  const parts = slug.split('-')
  const lastPart = parts[parts.length - 1]
  
  // If last part is a valid ObjectId (24 hex characters)
  if (/^[a-f0-9]{24}$/.test(lastPart)) {
    return lastPart
  }
  
  // If slug is just an ObjectId
  if (/^[a-f0-9]{24}$/.test(slug)) {
    return slug
  }
  
  // Otherwise, treat the entire slug as the identifier
  return slug
}
