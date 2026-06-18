const { Story } = require('../models/dbManager');

const sortStories = (items) =>
  [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

exports.getHero = async (_req, res) => {
  try {
    const stories = sortStories(await Story.find({ isHero: true }));
    if (stories.length > 0) {
      return res.json(stories[0]);
    }
    res.json(null);
  } catch (err) {
    console.error('GetHero error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.setHero = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Admin access required' });
    }

    const { title, caption, mediaType, mediaUrl } = req.body;
    if (!mediaUrl) {
      return res.status(400).json({ msg: 'Media URL is required' });
    }

    const existingHeroes = await Story.find({ isHero: true });
    for (const hero of existingHeroes) {
      await Story.findByIdAndUpdate(hero._id || hero.id, { isHero: false, postType: 'blog' });
    }

    const hero = await Story.create({
      title: title || 'Farokht Hero',
      caption: caption || '',
      content: '',
      mediaType: mediaType || 'video',
      mediaUrl,
      isHero: true,
      postType: 'hero',
      authorName: 'Farokht'
    });

    res.status(201).json(hero);
  } catch (err) {
    console.error('SetHero error:', err.message);
    res.status(500).send('Server error');
  }
};
