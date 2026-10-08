/** URL of a file in public/, respecting Vite's `base` (the app is served from /btl-questioner/). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`
