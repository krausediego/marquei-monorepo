export function createSlug(text: string): string {
  return text
    .normalize("NFD") // Normaliza caracteres Unicode
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .toLowerCase() // Converte para minúsculas
    .trim() // Remove espaços das extremidades
    .replace(/[^\w\s-]/g, "") // Remove caracteres especiais (mantém palavras, espaços e hífens)
    .replace(/[\s_]+/g, "-") // Substitui espaços e underscores por hífens
    .replace(/-+/g, "-") // Remove hífens duplicados
    .replace(/^-+|-+$/g, ""); // Remove hífens do início e fim
}

export function createUniqueSlug(text: string): string {
  const baseSlug = createSlug(text);
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 6); // 4 chars aleatórios
  return `${baseSlug}-${timestamp}-${random}`;
}
