/**
 * Resolves a static asset path for the current base URL.
 * Use for images and other public assets so they work on GitHub Pages (/steamgirl) and locally (/).
 */
export function assetUrl(path: string): string {
  if (!path) return path
  const base = import.meta.env.BASE_URL
  return base === '/' ? path : base + path.replace(/^\//, '')
}
