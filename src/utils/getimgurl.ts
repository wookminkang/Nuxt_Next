const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export const getImageUrl = (fileName: string, gCode?: string) => {
  return `${imageBaseUrl}/smartscore_erp_homepage/${gCode}/${fileName}`;
};