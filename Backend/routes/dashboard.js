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

function saveUsers(users) {
  fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
}

function applyDailyBonus(user) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  if (!user.lastDailyCredit) {
    user.lastDailyCredit = today;
    if (user.balance == null) user.balance = 0;
    return;
  }

  const last = new Date(user.lastDailyCredit);
  const now = new Date();
  const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    const bonus = 50 * diffDays;
    user.balance = (user.balance || 0) + bonus;
    user.dailyBonusIncome = (user.dailyBonusIncome || 0) + bonus;
    user.totalIncome = (user.totalIncome || 0) + bonus;
    user.lastDailyCredit = today;
  }
}

router.get('/', auth, (req, res) => {
  const users = loadUsers();
  const idx = users.findIndex((u) => u.id === req.user.id);
  if (idx === -1) return res.status(404).json({ message: 'User not found' });

  const user = users[idx];
  applyDailyBonus(user);
  users[idx] = user;
  saveUsers(users);

  const { password, ...userWithoutPassword } = user;

  res.json({
    user: userWithoutPassword,
    cards: {
      totalIncome: user.totalIncome || 0,
      withdrawal: user.withdrawal || 0,
      balance: user.balance || 0,
      dailyBonusIncome: user.dailyBonusIncome || 0,
      freedomIncome: user.freedomIncome || 0,
      rankRewardIncome: user.rankRewardIncome || 0,
    },
  });
});

module.exports = router;
