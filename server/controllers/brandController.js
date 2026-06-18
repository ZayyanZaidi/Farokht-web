const { Brand } = require('../models/dbManager');

// Get all verified brands (with optional filters)
exports.getBrands = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    // Standard filter
    if (category && category !== 'All') {
      query.category = category;
    }

    let brands = await Brand.find(query);

    // If search filter is active
    if (search) {
      const regex = new RegExp(search, 'i');
      brands = brands.filter(b => regex.test(b.name) || regex.test(b.description) || regex.test(b.handle));
    }

    res.json(brands);
  } catch (err) {
    console.error("GetBrands error:", err.message);
    res.status(500).send('Server error');
  }
};

// Get brand by Instagram handle
exports.getBrandByHandle = async (req, res) => {
  try {
    const brand = await Brand.findOne({ handle: req.params.handle });
    if (!brand) {
      return res.status(404).json({ msg: 'Brand not found' });
    }
    res.json(brand);
  } catch (err) {
    console.error("GetBrandByHandle error:", err.message);
    res.status(500).send('Server error');
  }
};

// Get brand for currently logged-in merchant
exports.getMyBrand = async (req, res) => {
  try {
    const brand = await Brand.findOne({ ownerId: req.user.id });
    if (!brand) {
      return res.status(404).json({ msg: 'No brand registered for this user' });
    }
    res.json(brand);
  } catch (err) {
    console.error("GetMyBrand error:", err.message);
    res.status(500).send('Server error');
  }
};

// Create a new brand profile
exports.createBrand = async (req, res) => {
  const { name, handle, description, logo, cover, category, whatsappGroupUrl, socialLinks } = req.body;
  try {
    // Check if user already owns a brand
    let brand = await Brand.findOne({ ownerId: req.user.id });
    if (brand) {
      return res.status(400).json({ msg: 'User already has a registered brand' });
    }

    // Check if handle is taken
    brand = await Brand.findOne({ handle });
    if (brand) {
      return res.status(400).json({ msg: 'Brand handle is already taken' });
    }

    const newBrand = await Brand.create({
      ownerId: req.user.id,
      name,
      handle,
      description,
      logo: logo || '',
      cover: cover || '',
      category,
      isVerified: false, // Starts as unverified
      whatsappGroupUrl: whatsappGroupUrl || '',
      socialLinks: socialLinks || { instagram: '', facebook: '', website: '' }
    });

    res.json(newBrand);
  } catch (err) {
    console.error("CreateBrand error:", err.message);
    res.status(500).send('Server error');
  }
};

// Update brand details
exports.updateBrand = async (req, res) => {
  const { name, description, logo, cover, category, whatsappGroupUrl, socialLinks } = req.body;
  try {
    let brand = await Brand.findOne({ ownerId: req.user.id });
    if (!brand) {
      return res.status(404).json({ msg: 'Brand not found' });
    }

    const id = brand._id || brand.id;
    const updatedBrand = await Brand.findByIdAndUpdate(id, {
      name: name || brand.name,
      description: description || brand.description,
      logo: logo !== undefined ? logo : brand.logo,
      cover: cover !== undefined ? cover : brand.cover,
      category: category || brand.category,
      whatsappGroupUrl: whatsappGroupUrl !== undefined ? whatsappGroupUrl : brand.whatsappGroupUrl,
      socialLinks: socialLinks || brand.socialLinks
    });

    res.json(updatedBrand);
  } catch (err) {
    console.error("UpdateBrand error:", err.message);
    res.status(500).send('Server error');
  }
};

// Admin verify brand status
exports.verifyBrand = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ msg: 'Brand not found' });
    }

    const id = brand._id || brand.id;
    const updatedBrand = await Brand.findByIdAndUpdate(id, { isVerified: true });
    res.json(updatedBrand);
  } catch (err) {
    console.error("VerifyBrand error:", err.message);
    res.status(500).send('Server error');
  }
};
