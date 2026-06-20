const multer = require('multer');
const path = require('path');
const fs = require('fs');

const isVercel = !!process.env.VERCEL;
const uploadDir = isVercel ? '/tmp' : path.join(__dirname, '..', 'uploads');

if (!isVercel && !fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${Date.now()}-${safeName}`);
  }
});

const fileFilter = (_req, file, cb) => {
  const allowed = /^(image\/(jpeg|jpg|png|gif|webp)|video\/(mp4|webm|quicktime))$/i;
  if (allowed.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only images (JPEG, PNG, GIF, WebP) and videos (MP4, WebM) are allowed'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 80 * 1024 * 1024 }
});

module.exports = upload;
