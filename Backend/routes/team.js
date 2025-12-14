const express = require('express');
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');

const router = express.Router();

const USERS_PATH = path.join(__dirname, '..', 'data', 'users.json');

function loadUsers() {
  if (!fs.existsSync(USERS_PATH)) return [];
  const raw = fs.readFileSync(USERS_PATH, 'utf-8');
  try {
    return JSON.parse(raw || '[]');
  } catch (e) {
    return [];
  }
}

// Direct team members (users invited by current user)
router.get('/direct', auth, (req, res) => {
  const users = loadUsers();
  const me = users.find((u) => u.id === req.user.id);
  if (!me) return res.status(404).json({ message: 'User not found' });

  const ids = Array.isArray(me.directInviteIds) ? me.directInviteIds : [];
  const direct = ids
    .map((id) => users.find((u) => u.id === id))
    .filter(Boolean)
    .map((u) => ({
      id: u.id,
      name: u.name,
      inviteCode: u.inviteCode,
      isActivated: !!u.isActivated,
      role: u.role || 'member',
      createdAt: u.createdAt || null,
    }));

  return res.json({ members: direct });
});

module.exports = router;
