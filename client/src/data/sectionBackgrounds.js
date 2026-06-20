import { BG } from './referenceAssets';

/**
 * Every section whose background image can be changed by an admin.
 * `id` must match the sectionId used by the /api/backgrounds API.
 */
export const SECTION_DEFS = [
  { id: 'hero', label: 'Hero / Top Section', default: '/assets/bg/hero.png' },
  { id: 'brands', label: 'Brand Discovery', default: '/assets/bg/blank.jpeg' },
  { id: 'supportLocal', label: 'Where Content Meets Commerce', default: '/assets/bg/blank.jpeg' },
  { id: 'feed', label: "Brands' Latest Content", default: '/assets/bg/blank.jpeg' },
  { id: 'appPromo', label: 'What Farokht Brings You', default: '/assets/bg/blank.jpeg' },
  { id: 'foreignApps', label: 'Foreign Apps Warning', default: '/assets/bg/catalog.jpeg' },
  { id: 'milestones', label: 'Recognitions & Milestones', default: '/assets/bg/blank.jpeg' },
  { id: 'campaign', label: 'Marketing Campaign', default: '/assets/bg/main-hoon.jpeg' },
  { id: 'blog', label: 'Podcast / Blog', default: '/assets/bg/blank.jpeg' },
  { id: 'footer', label: 'Footer', default: '/assets/bg/footer.jpg' }
];

export const DEFAULT_SECTION_BACKGROUNDS = SECTION_DEFS.reduce((acc, section) => {
  acc[section.id] = section.default;
  return acc;
}, {});
