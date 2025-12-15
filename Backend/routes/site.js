const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const TEAM_MEMBERS_PATH = path.join(__dirname, '..', 'data', 'teamMembers.json');
const TESTIMONIALS_PATH = path.join(__dirname, '..', 'data', 'testimonials.json');

function ensureFile(p) {
  if (!fs.existsSync(p)) {
    fs.writeFileSync(p, JSON.stringify([], null, 2));
  }
}

function loadJsonArray(p) {
  ensureFile(p);
  const raw = fs.readFileSync(p, 'utf-8');
  try {
    const arr = JSON.parse(raw || '[]');
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    return [];
  }
}

// Public: team members shown on landing page
router.get('/team-members', (req, res) => {
  const teamMembers = loadJsonArray(TEAM_MEMBERS_PATH);
  res.json({ teamMembers });
});

// Public: testimonials shown on landing page
router.get('/testimonials', (req, res) => {
  const testimonials = loadJsonArray(TESTIMONIALS_PATH);
  res.json({ testimonials });
});

module.exports = router;
