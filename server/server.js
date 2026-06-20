// server/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./config/db');

const authRoutes = require('./routes/auth');
const brandRoutes = require('./routes/brand');
const productRoutes = require('./routes/product');
const storyRoutes = require('./routes/story');
const uploadRoutes = require('./routes/upload');
const heroRoutes = require('./routes/hero');
const farokhtRoutes = require('./routes/farokht');
const backgroundRoutes = require('./routes/background');
const { seedAdminUser } = require('./utils/seedAdmin');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB (or fallback)
connectDB().then(() => seedAdminUser());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/products', productRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/farokht', farokhtRoutes);
app.use('/api/backgrounds', backgroundRoutes);

// Serve uploaded media (use /tmp on Vercel read-only filesystem)
const uploadStaticDir = process.env.VERCEL ? '/tmp' : path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadStaticDir));

// Serve static assets (downloaded Canva media) from /media_assets
app.use('/media', express.static(path.join(__dirname, '..', 'scratch', 'media_assets')));

// Serve frontend build in production if it exists
const fs = require('fs');
const distPath = path.join(__dirname, '..', 'client', 'dist');
if (process.env.NODE_ENV === 'production' && fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({ message: 'Farokht API is running.' });
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
