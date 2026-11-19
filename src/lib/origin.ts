/** Public production origin, supplied at build time after domain approval. */
export const siteOrigin = process.env.SITE_ORIGIN ? new URL(process.env.SITE_ORIGIN) : undefined;
