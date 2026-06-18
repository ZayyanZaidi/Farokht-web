import { getDefaultHeroMedia } from '../utils/media';

/** Placeholder content until product/brand DB is connected */

export const PLACEHOLDER_BRANDS = [
  { id: 'saya', name: 'SAYA', category: 'Fashion', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=560&fit=crop', link: '/directory?category=Fashion' },
  { id: 'purpur', name: 'Purpur', category: 'Skincare', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=560&fit=crop', link: '/directory?category=Beauty' },
  { id: 'foodfusion', name: 'FoodFusion', category: 'Food', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=560&fit=crop', link: '/directory?category=Food' },
  { id: 'duck', name: 'DCK Studio', category: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=560&fit=crop', link: '/directory?category=Fashion' },
  { id: 'ecostudio', name: 'ECO STUDIO', category: 'Home', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=560&fit=crop', link: '/directory?category=Home' },
  { id: 'maazjee', name: 'MAAZJEE', category: 'Fashion', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=560&fit=crop', link: '/directory?category=Fashion' }
];

export const PLACEHOLDER_FEED = [
  { id: 1, handle: 'HanaWithAnklet', time: '2h ago', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop', price: 'Rs. 4,650' },
  { id: 2, handle: 'Allure Cosmetics', time: '5h ago', image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403b0a?w=400&h=500&fit=crop', price: 'Rs. 2,200' },
  { id: 3, handle: 'LuxeByMira', time: '1h ago', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop', price: 'Rs. 5,200' },
  { id: 4, handle: 'The Happy Home', time: '3h ago', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=500&fit=crop', price: 'Rs. 1,200' },
  { id: 5, handle: 'Yarn & Threads', time: '12h ago', image: 'https://images.unsplash.com/photo-1558171813-1c045a1e1f4b?w=400&h=500&fit=crop', price: 'Rs. 999' }
];

export const PLACEHOLDER_PRODUCTS = [
  { name: 'Handcrafted Biryani Kit', price: 2499, image: 'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=300&h=400&fit=crop', label: 'Your catalogue' },
  { name: 'Embroidered Kurta', price: 4500, image: 'https://images.unsplash.com/photo-1583497013669-9479a74c1117?w=300&h=400&fit=crop', label: 'Content' },
  { name: 'Artisan Home Decor', price: 3200, image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=300&h=400&fit=crop', label: 'More about your brand!' }
];

export const DEFAULT_BLOGS = [
  {
    id: 'default-1',
    category: 'GUIDES',
    title: 'Fashion For Buying Local in Pakistan',
    caption: 'How to discover authentic brands through content-first shopping.',
    content: 'Farokht helps you find verified local brands through stories, not endless scrolling.',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1483985988354-763728e3685b?w=600&h=800&fit=crop'
  },
  {
    id: 'default-2',
    category: 'CULTURE',
    title: 'Why Storytelling Matters for SMEs',
    caption: 'Culture-driven commerce builds trust between brands and communities.',
    content: 'Every Pakistani brand has a story — Farokht is where those stories meet shopping.',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=800&fit=crop'
  },
  {
    id: 'default-3',
    category: 'COMMERCE',
    title: 'Content Commerce Without Foreign Apps',
    caption: 'Own your audience when platforms go down.',
    content: 'Build your digital identity on infrastructure made for Pakistan.',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1556745757-7563817ebeb3?w=600&h=800&fit=crop'
  }
];

export const HERO_FALLBACK = getDefaultHeroMedia();
