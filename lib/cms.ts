export const cmsUrl = process.env.NODE_ENV === "development" ? "http://localhost:4000" : "https://cms.travelinyourpocket.com"

export const getImageUrl = (url: string) => `${cmsUrl}${url}`;
