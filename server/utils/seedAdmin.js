const bcrypt = require('bcryptjs');
const { User } = require('../models/dbManager');

async function seedAdminUser() {
  const email = process.env.ADMIN_EMAIL || 'admin@farokht.pk';
  const password = process.env.ADMIN_PASSWORD || 'FarokhtAdmin123!';

  try {
    const existing = await User.findOne({ email });
    if (existing) return;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      username: 'farokht_admin',
      email,
      password: hashedPassword,
      role: 'admin'
    });

    console.log(`Default admin ready: ${email}`);
  } catch (err) {
    console.warn('Admin seed skipped:', err.message);
  }
}

module.exports = { seedAdminUser };
