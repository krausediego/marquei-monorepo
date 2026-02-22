export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function generateUniqueSlug(name: string): string {
  const base = generateSlug(name);
  const suffix = Math.random().toString(36).slice(2, 7);
  return `${base}-${suffix}`;
}
