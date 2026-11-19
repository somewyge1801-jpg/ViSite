/** Sub-path the site is served from (e.g. "/ViSite" on GitHub Pages). Empty at the domain root. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefixes an absolute site path with the deployment sub-path. */
export function withBasePath(path: string) {
  return basePath && path.startsWith("/") ? basePath + path : path;
}
