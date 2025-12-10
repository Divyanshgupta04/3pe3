const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');

const router = express.Router();

const KYC_PATH = path.join(__dirname, '..', 'data', 'kyc.json');
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

function loadKyc() {
  if (!fs.existsSync(KYC_PATH)) return [];
  const raw = fs.readFileSync(KYC_PATH, 'utf-8');
  try {
    return JSON.parse(raw || '[]');
  } catch (e) {
    return [];
  }
}

function saveKyc(records) {
  fs.writeFileSync(KYC_PATH, JSON.stringify(records, null, 2));
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

router.post('/', auth, upload.single('document'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'KYC document file is required (field name: document)' });
    }

    const { kycType } = req.body;

    const records = loadKyc();
    const existingIdx = records.findIndex((r) => r.userId === req.user.id);

    const record = {
      userId: req.user.id,
      kycType: kycType || '',
      fileName: req.file.filename,
      filePath: `/uploads/${req.file.filename}`,
      uploadedAt: new Date().toISOString(),
    };

    if (existingIdx === -1) {
      records.push(record);
    } else {
      records[existingIdx] = record;
    }

    saveKyc(records);

    res.status(201).json({ kyc: record });
  } catch (err) {
    console.error('KYC upload error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', auth, (req, res) => {
  const records = loadKyc();
  const record = records.find((r) => r.userId === req.user.id);
  if (!record) return res.status(404).json({ message: 'No KYC record found' });
  res.json({ kyc: record });
});

module.exports = router;
