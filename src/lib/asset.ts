export function asset(path: string) {
  const cleanPath = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}

export function optimizedGalleryImageAssets(path: string) {
  const cleanPath = path.replace(/^\/+/, "");
  const stem = cleanPath.replace(/\.[^.]+$/, "");

  return {
    lightboxSrc: asset(`${stem}.lightbox.webp`),
    originalSrc: asset(cleanPath),
    thumbnailSrc: asset(`${stem}.thumb.webp`),
  };
}
