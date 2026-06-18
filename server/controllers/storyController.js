const { Story, Brand } = require('../models/dbManager');

const sortByDate = (items) =>
  [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

exports.getStories = async (req, res) => {
  try {
    const { brandId, hero, type } = req.query;
    let query = {};

    if (brandId) query.brandId = brandId;
    if (hero === 'true') query.isHero = true;
    if (type === 'blog') query.isHero = false;

    let stories = sortByDate(await Story.find(query));

    if (type === 'blog') {
      stories = stories.filter((s) => !s.isHero && s.postType !== 'hero');
    }

    res.json(stories);
  } catch (err) {
    console.error('GetStories error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ msg: 'Story not found' });
    res.json(story);
  } catch (err) {
    console.error('GetStory error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.createStory = async (req, res) => {
  try {
    const { title, caption, content, mediaType, mediaUrl, isHero, category } = req.body;
    let brandId = null;
    let authorName = req.user.role === 'admin' ? 'Farokht' : 'Merchant';

    if (req.user.role !== 'admin') {
      const brand = await Brand.findOne({ ownerId: req.user.id });
      if (!brand) return res.status(404).json({ msg: 'Register brand first' });
      brandId = brand._id || brand.id;
      authorName = brand.name || authorName;
    }

    if (req.user.role !== 'admin' && isHero) {
      return res.status(403).json({ msg: 'Only admins can set hero content' });
    }

    if (isHero && req.user.role === 'admin') {
      const existingHeroes = await Story.find({ isHero: true });
      for (const hero of existingHeroes) {
        await Story.findByIdAndUpdate(hero._id || hero.id, { isHero: false, postType: 'blog' });
      }
    }

    const story = await Story.create({
      title,
      caption,
      content: content || '',
      mediaType: mediaType || 'image',
      mediaUrl: mediaUrl || '',
      category: category || 'GUIDES',
      postType: isHero ? 'hero' : 'blog',
      isHero: !!isHero,
      brandId,
      authorName
    });

    res.status(201).json(story);
  } catch (err) {
    console.error('CreateStory error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.updateStory = async (req, res) => {
  try {
    const { title, caption, content, mediaType, mediaUrl, isHero, category } = req.body;
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ msg: 'Story not found' });

    if (req.user.role !== 'admin') {
      const brand = await Brand.findOne({ ownerId: req.user.id });
      if (!brand || !story.brandId || story.brandId.toString() !== (brand._id || brand.id).toString()) {
        return res.status(403).json({ msg: 'Not authorized' });
      }
    }

    if (isHero && req.user.role === 'admin') {
      const existingHeroes = await Story.find({ isHero: true });
      for (const hero of existingHeroes) {
        const heroId = hero._id || hero.id;
        const storyId = story._id || story.id;
        if (heroId !== storyId) {
          await Story.findByIdAndUpdate(heroId, { isHero: false, postType: 'blog' });
        }
      }
    }

    const updatedStory = await Story.findByIdAndUpdate(req.params.id, {
      title: title || story.title,
      caption: caption || story.caption,
      content: content !== undefined ? content : story.content,
      mediaType: mediaType || story.mediaType,
      mediaUrl: mediaUrl !== undefined ? mediaUrl : story.mediaUrl,
      category: category || story.category,
      postType: isHero !== undefined ? (isHero ? 'hero' : 'blog') : story.postType,
      isHero: isHero !== undefined ? !!isHero : story.isHero
    });

    res.json(updatedStory);
  } catch (err) {
    console.error('UpdateStory error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ msg: 'Story not found' });

    if (req.user.role !== 'admin') {
      const brand = await Brand.findOne({ ownerId: req.user.id });
      if (!brand || !story.brandId || story.brandId.toString() !== (brand._id || brand.id).toString()) {
        return res.status(403).json({ msg: 'Not authorized' });
      }
    }

    await Story.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Story removed' });
  } catch (err) {
    console.error('DeleteStory error:', err.message);
    res.status(500).send('Server error');
  }
};
