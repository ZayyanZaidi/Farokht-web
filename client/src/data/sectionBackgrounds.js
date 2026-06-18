import { BG } from './referenceAssets';

/**
 * Every section whose background image can be changed by an admin.
 * `id` must match the sectionId used by the /api/backgrounds API.
 */
export const SECTION_DEFS = [
  { id: 'hero', label: 'Hero / Top Section', default: '' },
  { id: 'brands', label: 'Brand Discovery', default: '' },
  { id: 'supportLocal', label: 'Where Content Meets Commerce', default: '' },
  { id: 'feed', label: "Brands' Latest Content", default: '' },
  { id: 'appPromo', label: 'What Farokht Brings You', default: '' },
  { id: 'foreignApps', label: 'Foreign Apps Warning', default: '' },
  { id: 'milestones', label: 'Recognitions & Milestones', default: '' },
  { id: 'campaign', label: 'Marketing Campaign', default: '' },
  { id: 'blog', label: 'Podcast / Blog', default: '' },
  { id: 'footer', label: 'Footer', default: '' }
];

export const DEFAULT_SECTION_BACKGROUNDS = SECTION_DEFS.reduce((acc, section) => {
  acc[section.id] = section.default;
  return acc;
}, {});
