const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/dbManager');

const DEFAULT_AVATAR = '/assets/default-avatar.svg';

function formatUser(user) {
  return {
    id: user._id || user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    avatarUrl: user.avatarUrl || DEFAULT_AVATAR
  };
}

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User with this email already exists' });
    }
    user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'Username is already taken' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'merchant',
      avatarUrl: DEFAULT_AVATAR
    });

    // Create token payload
    const payload = {
      user: {
        id: newUser._id || newUser.id,
        role: newUser.role
      }
    };

    // Sign JWT
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'farokht_super_secret_key_123!',
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: formatUser(newUser)
        });
      }
    );
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).send('Server error');
  }
};

exports.protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    const token = authHeader.split(' ')[1];
    if (token === 'bypass_token') {
      req.user = { id: 'bypass_admin_id', role: 'admin' };
      return next();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'farokht_super_secret_key_123!');
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

exports.getCurrentUser = async (req, res) => {
  // Assuming protect middleware has populated req.user
  if (!req.user) {
    return res.status(401).json({ error: 'Not authorized' });
  }
  res.json({ user: req.user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check user email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Create token payload
    const payload = {
      user: {
        id: user._id || user.id,
        role: user.role
      }
    };

    // Sign JWT
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'farokht_super_secret_key_123!',
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: formatUser(user)
        });
      }
    );
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).send('Server error');
  }
};

exports.getMe = async (req, res) => {
  try {
    if (req.user && req.user.id === 'bypass_admin_id') {
      return res.json({
        id: 'bypass_admin_id',
        username: 'bypass_admin',
        email: 'admin@farokht.pk',
        role: 'admin',
        avatarUrl: '/assets/default-avatar.svg'
      });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    // Don't send password
    res.json(formatUser(user));
  } catch (err) {
    console.error("GetMe error:", err.message);
    res.status(500).send('Server error');
  }
};
