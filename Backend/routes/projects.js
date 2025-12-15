const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const PROJECTS_PATH = path.join(__dirname, '..', 'data', 'projects.json');

function ensureProjectsFile() {
  if (!fs.existsSync(PROJECTS_PATH)) {
    fs.writeFileSync(PROJECTS_PATH, JSON.stringify([], null, 2));
  }
}

function loadProjects() {
  ensureProjectsFile();
  const raw = fs.readFileSync(PROJECTS_PATH, 'utf-8');
  try {
    const arr = JSON.parse(raw || '[]');
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    return [];
  }
}

// Public: list projects
router.get('/', (req, res) => {
  const projects = loadProjects();
  res.json({ projects });
});

module.exports = router;
