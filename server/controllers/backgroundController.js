const { SectionBackground } = require('../models/dbManager');

// Default background image for each homepage/site section. These ship with the
// project (client/public/assets/bg/*.jpg) and are used until an admin overrides them.
const SECTION_DEFAULTS = {
  hero: '/assets/bg/hero.png',
  brands: '/assets/bg/blank.jpeg',
  supportLocal: '/assets/bg/blank.jpeg',
  feed: '/assets/bg/blank.jpeg',
  appPromo: '/assets/bg/blank.jpeg',
  foreignApps: '/assets/bg/catalog.jpeg',
  milestones: '/assets/bg/blank.jpeg',
  campaign: '/assets/bg/main-hoon.jpeg',
  blog: '/assets/bg/blank.jpeg',
  footer: '/assets/bg/footer.jpg'
};

exports.SECTION_DEFAULTS = SECTION_DEFAULTS;

// GET /api/backgrounds - public. Returns a map of sectionId -> imageUrl, merging
// any admin-saved overrides on top of the shipped defaults.
exports.getBackgrounds = async (_req, res) => {
  try {
    const overrides = await SectionBackground.find({});
    const map = { ...SECTION_DEFAULTS };
    overrides.forEach((item) => {
      if (item && item.sectionId) {
        map[item.sectionId] = item.imageUrl;
      }
    });
    res.json(map);
  } catch (err) {
    console.error('GetBackgrounds error:', err.message);
    res.status(500).send('Server error');
  }
};

// PUT /api/backgrounds/:sectionId - admin only. Upserts the background image for a section.
exports.setBackground = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Admin access required' });
    }

    const { sectionId } = req.params;
    const { imageUrl } = req.body;

    if (!SECTION_DEFAULTS[sectionId]) {
      return res.status(400).json({ msg: `Unknown section "${sectionId}"` });
    }
    if (!imageUrl || !imageUrl.trim()) {
      return res.status(400).json({ msg: 'imageUrl is required' });
    }

    const existing = await SectionBackground.findOne({ sectionId });
    const saved = existing
      ? await SectionBackground.findByIdAndUpdate(existing._id || existing.id, { sectionId, imageUrl })
      : await SectionBackground.create({ sectionId, imageUrl });

    res.status(200).json(saved);
  } catch (err) {
    console.error('SetBackground error:', err.message);
    res.status(500).send('Server error');
  }
};

// DELETE /api/backgrounds/:sectionId - admin only. Clears the override, reverting to default.
exports.resetBackground = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Admin access required' });
    }

    const { sectionId } = req.params;
    if (!SECTION_DEFAULTS[sectionId]) {
      return res.status(400).json({ msg: `Unknown section "${sectionId}"` });
    }

    const existing = await SectionBackground.findOne({ sectionId });
    if (existing) {
      await SectionBackground.findByIdAndDelete(existing._id || existing.id);
    }

    res.json({ sectionId, imageUrl: SECTION_DEFAULTS[sectionId] });
  } catch (err) {
    console.error('ResetBackground error:', err.message);
    res.status(500).send('Server error');
  }
};
