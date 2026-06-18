import { apiFetch } from '../utils/api';

function formatPrice(price) {
  if (price == null || Number.isNaN(Number(price))) return '';
  return `Rs. ${Number(price).toLocaleString('en-PK')}`;
}

function timeAgo(iso) {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-PK', { month: 'short', day: 'numeric' });
}

export function mapPostToFeedItem(post) {
  const brand = post.user?.brandName || post.user?.fullName || 'Brand';
  return {
    id: post.postId,
    handle: brand,
    avatar: post.user?.logoUrl,
    time: timeAgo(post.createdAt),
    image: post.image,
    price: post.price != null ? formatPrice(post.discountedPrice || post.price) : '',
    title: post.title,
    description: post.description,
    brandId: post.user?.id
  };
}

export function mapPostToProduct(post, label) {
  return {
    id: post.postId,
    name: post.title || 'Product',
    price: post.discountedPrice || post.price,
    image: post.image,
    label: label || post.user?.brandName || 'Product',
    brandName: post.user?.brandName
  };
}

export async function fetchBrands(limit = 24) {
  const response = await apiFetch(`/api/farokht/brands?limit=${limit}`);
  if (!response.ok) return [];
  const json = await response.json();
  return Array.isArray(json.data) ? json.data : [];
}

export async function fetchContentPosts(limit = 20) {
  const response = await apiFetch(`/api/farokht/posts?limit=${limit}&postType=POST`);
  if (!response.ok) return [];
  const json = await response.json();
  return (json.data || []).map(mapPostToFeedItem);
}

export async function fetchProductPosts(limit = 12) {
  const response = await apiFetch(`/api/farokht/posts?limit=${limit}&postType=PRODUCT`);
  if (!response.ok) return [];
  const json = await response.json();
  const labels = ['Your catalogue', 'Content', 'More about your brand!'];
  return (json.data || []).slice(0, 3).map((p, i) => mapPostToProduct(p, labels[i]));
}
