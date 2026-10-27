export type DeploymentEnvironment = {
  NEXT_PUBLIC_SITE_URL?: string;
  VERCEL_ENV?: string;
  VERCEL_URL?: string;
  VERCEL_PROJECT_PRODUCTION_URL?: string;
  SITE_INDEXING?: string;
};

function origin(value?: string) {
  if (!value?.trim()) return undefined;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash || url.pathname !== "/") return undefined;
    return url.origin;
  } catch { return undefined; }
}

/** Preview builds never inherit a production canonical or indexing permission. */
export function deploymentConfig(env: DeploymentEnvironment) {
  const configured = origin(env.NEXT_PUBLIC_SITE_URL);
  if (env.NEXT_PUBLIC_SITE_URL?.trim() && !configured)
    throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTPS origin with no credentials, path, query, or fragment.");
  const preview = !!env.VERCEL_ENV && env.VERCEL_ENV !== "production";
  const generated = env.VERCEL_URL ? origin(`https://${env.VERCEL_URL}`) : undefined;
  const production = env.VERCEL_PROJECT_PRODUCTION_URL ? origin(`https://${env.VERCEL_PROJECT_PRODUCTION_URL}`) : undefined;
  const url = preview ? generated : configured ?? production ?? generated;
  const indexable = env.SITE_INDEXING === "production" && !preview && !!configured;
  if (env.SITE_INDEXING === "production" && !preview && !configured)
    throw new Error("Production indexing requires an approved NEXT_PUBLIC_SITE_URL.");
  return { url, indexable };
}

export const deployment = deploymentConfig({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  VERCEL_ENV: process.env.VERCEL_ENV,
  VERCEL_URL: process.env.VERCEL_URL,
  VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
  SITE_INDEXING: process.env.SITE_INDEXING,
});
