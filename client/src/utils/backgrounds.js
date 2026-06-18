import { apiFetch, resolveMediaUrl } from './api';
import { DEFAULT_SECTION_BACKGROUNDS } from '../data/sectionBackgrounds';

// Bundled background images (client/public/assets/bg/*.jpg) are served by the
// client itself, while admin-uploaded files live on the API server under /uploads.
export function resolveBackgroundUrl(url) {
  if (!url) return '';
  if (url.startsWith('/assets/')) return url;
  return resolveMediaUrl(url);
}

export async function fetchSectionBackgrounds() {
  try {
    const response = await apiFetch('/api/backgrounds');
    if (response.ok) {
      const data = await response.json();
      return { ...DEFAULT_SECTION_BACKGROUNDS, ...data };
    }
  } catch (err) {
    console.error('Backgrounds load failed:', err);
  }
  return { ...DEFAULT_SECTION_BACKGROUNDS };
}

export async function saveSectionBackground(sectionId, imageUrl) {
  const response = await apiFetch(`/api/backgrounds/${sectionId}`, {
    method: 'PUT',
    body: JSON.stringify({ imageUrl })
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.msg || 'Failed to save background');
  }
  return response.json();
}

export async function resetSectionBackground(sectionId) {
  const response = await apiFetch(`/api/backgrounds/${sectionId}`, { method: 'DELETE' });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.msg || 'Failed to reset background');
  }
  return response.json();
}
