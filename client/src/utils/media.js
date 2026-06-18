import { DEFAULT_AVATAR, DEFAULT_HERO_POSTER, DEFAULT_HERO_VIDEO } from '../data/referenceAssets';
import { BG } from '../data/referenceAssets';
import { resolveMediaUrl } from './api';

const FALLBACK_IMAGES = {
  brand: 'https://images.unsplash.com/photo-1441986301047-7a8c533c7e0c?w=400&h=560&fit=crop',
  post: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop',
  product: 'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=300&h=400&fit=crop',
  blog: 'https://images.unsplash.com/photo-1483985988354-763728e3685b?w=600&h=800&fit=crop',
  milestone: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop',
  campaign: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop',
  avatar: DEFAULT_AVATAR
};

export function pickFallback(type = 'post') {
  return FALLBACK_IMAGES[type] || FALLBACK_IMAGES.post;
}

export function resolveImageUrl(url, fallbackType = 'post') {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return pickFallback(fallbackType);
  }
  /* Vite-imported assets are already fully resolved (absolute URLs or data URIs) */
  if (url.startsWith('/src/') || url.startsWith('data:') || url.includes('assets/NewContent')) {
    return url;
  }
  return resolveMediaUrl(url);
}

export function getDefaultHeroMedia() {
  return {
    mediaType: 'video',
    mediaUrl: DEFAULT_HERO_VIDEO,
    poster: DEFAULT_HERO_POSTER,
    title: 'Content Commerce Platform',
    caption: 'Discover your favorite brands through content from all across Pakistan.'
  };
}

export { BG, DEFAULT_HERO_POSTER, DEFAULT_HERO_VIDEO };
