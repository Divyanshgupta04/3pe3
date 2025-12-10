const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const USERS_PATH = path.join(__dirname, '..', 'data', 'users.json');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_jwt_key_change_me';

function loadUsers() {
  if (!fs.existsSync(USERS_PATH)) return [];
  const raw = fs.readFileSync(USERS_PATH, 'utf-8');
  try {
    return JSON.parse(raw || '[]');
  } catch (e) {
    return [];
  }
}

// Simple admin login: username: admin, password: admin123
router.post('/login', (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  if (username !== 'admin' || password !== 'admin123') {
    return res.status(401).json({ message: 'Invalid admin credentials' });
  }

  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });
  return res.json({ token });
});

// Middleware to protect admin routes
function adminAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Invalid authorization header' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized as admin' });
    }
    req.admin = true;
    next();
  } catch (err) {
    console.error('Admin JWT verify error', err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

// Get all users with invite stats for admin panel
router.get('/users', adminAuth, (req, res) => {
  const users = loadUsers();

  const result = users.map((user) => {
    const invitees = users.filter((u) => u.sponsorId === user.inviteCode);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      address: user.address || '',
      sponsorId: user.sponsorId || '',
      sponsorName: user.sponsorName || '',
      inviteCode: user.inviteCode,
      balance: user.balance || 0,
      totalIncome: user.totalIncome || 0,
      withdrawal: user.withdrawal || 0,
      freedomIncome: user.freedomIncome || 0,
      dailyBonusIncome: user.dailyBonusIncome || 0,
      rankRewardIncome: user.rankRewardIncome || 0,
      createdAt: user.createdAt || null,
      directInviteCount: invitees.length,
      invitees: invitees.map((inv) => ({
        id: inv.id,
        name: inv.name,
        email: inv.email,
        phone: inv.phone || '',
        balance: inv.balance || 0,
        inviteCode: inv.inviteCode,
      })),
    };
  });

  res.json({ users: result });
});

module.exports = router;
