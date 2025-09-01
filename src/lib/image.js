// src/lib/image.js
export async function fileToDataUrl(file, { maxSize = 1280, quality = 0.85 } = {}) {
  if (!file) return null;

  const objectUrl = URL.createObjectURL(file);
  const img = await new Promise((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = objectUrl;
  });

  const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
  const w = Math.round(img.width * scale);
  const h = Math.round(img.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, w, h);
  const dataUrl = canvas.toDataURL('image/jpeg', quality);
  URL.revokeObjectURL(objectUrl);
  return dataUrl;
}
