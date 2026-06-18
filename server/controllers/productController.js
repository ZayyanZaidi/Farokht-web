const { Product, Brand } = require('../models/dbManager');

exports.getAllProducts = async (_req, res) => {
  try {
    const products = await Product.find({});
    const sorted = [...products].sort(
      (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );
    res.json(sorted);
  } catch (err) {
    console.error('GetAllProducts error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getProductsByBrand = async (req, res) => {
  try {
    const { brandId } = req.params;
    const products = await Product.find({ brandId });
    res.json(products);
  } catch (err) {
    console.error("GetProductsByBrand error:", err.message);
    res.status(500).send('Server error');
  }
};

// Create a new product in brand catalogue
exports.createProduct = async (req, res) => {
  const { name, description, price, image } = req.body;
  try {
    // Verify brand ownership
    const brand = await Brand.findOne({ ownerId: req.user.id });
    if (!brand) {
      return res.status(404).json({ msg: 'Register your brand first before adding products' });
    }

    const brandId = brand._id || brand.id;
    const newProduct = await Product.create({
      brandId,
      name,
      description,
      price: Number(price),
      image: image || '',
      isAvailable: true
    });

    res.json(newProduct);
  } catch (err) {
    console.error("CreateProduct error:", err.message);
    res.status(500).send('Server error');
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  const { name, description, price, image, isAvailable } = req.body;
  try {
    // Verify brand ownership
    const brand = await Brand.findOne({ ownerId: req.user.id });
    if (!brand) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Verify product belongs to merchant's brand
    const brandIdStr = brand._id || brand.id;
    if (product.brandId !== brandIdStr) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
      name: name || product.name,
      description: description !== undefined ? description : product.description,
      price: price !== undefined ? Number(price) : product.price,
      image: image !== undefined ? image : product.image,
      isAvailable: isAvailable !== undefined ? isAvailable : product.isAvailable
    });

    res.json(updatedProduct);
  } catch (err) {
    console.error("UpdateProduct error:", err.message);
    res.status(500).send('Server error');
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const brand = await Brand.findOne({ ownerId: req.user.id });
    if (!brand) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    const brandIdStr = brand._id || brand.id;
    if (product.brandId !== brandIdStr) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Product removed from catalogue' });
  } catch (err) {
    console.error("DeleteProduct error:", err.message);
    res.status(500).send('Server error');
  }
};
