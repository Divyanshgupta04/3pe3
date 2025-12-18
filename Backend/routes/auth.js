const express = require('express');
const bcrypt = require('bcryptjs');
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

function saveUsers(users) {
  fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
}

function generateInviteCode(users) {
  let code;
  do {
    code = 'LS' + Math.floor(100000 + Math.random() * 900000); // e.g. LS123456
  } while (users.some((u) => u.inviteCode === code));
  return code;
}

function generateUserId(users) {
  // More unique than Date.now() alone (avoids collisions if multiple users created quickly)
  let id;
  do {
    id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  } while (users.some((u) => String(u.id) === id));
  return id;
}

// Public helper: lookup sponsor by invite code (for auto-fill sponsor name on register page)
router.get('/sponsor/:code', (req, res) => {
  const code = String(req.params.code || '').trim();
  if (!code) return res.status(400).json({ message: 'Invite code is required' });

  const users = loadUsers();
  const sponsorUser = users.find((u) => String(u.inviteCode || '').trim() === code);
  if (!sponsorUser) return res.status(404).json({ message: 'Invalid invite code' });

  return res.json({ sponsor: { id: sponsorUser.id, name: sponsorUser.name, inviteCode: sponsorUser.inviteCode } });
});

router.post('/register', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      sponsorId, // invite code of the sponsor / upline
      sponsorName, // ignored if sponsorId matches an existing user (we set sponsor name automatically)
      phone,
      address,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const users = loadUsers();

    // For the first-ever user allow signup without sponsor.
    // For all others sponsorId must be a valid invite code.
    const hasExistingUsers = users.length > 0;
    if (hasExistingUsers && !sponsorId) {
      return res.status(400).json({ message: 'Invite code (Sponsor ID) is required' });
    }

    // Find sponsor
    let sponsorUser = null;
    if (hasExistingUsers) {
      const code = String(sponsorId || '').trim();
      sponsorUser = users.find(
        (u) =>
          String(u.inviteCode || '').trim() === code ||
          String(u.id || '').trim() === code ||
          (u.sponsorId && String(u.sponsorId).trim() === code)
      );
      if (!sponsorUser) {
        return res.status(400).json({ message: 'Invalid invite code' });
      }
    }

    // Uniqueness: email (case-insensitive)
    const normalizedEmail = String(email).trim().toLowerCase();
    const existingEmail = users.find((u) => String(u.email || '').trim().toLowerCase() === normalizedEmail);
    if (existingEmail) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Uniqueness: phone (digits-only, last 10 digits) if provided
    const normalizePhone = (v) => {
      const digits = String(v || '').replace(/\D/g, '');
      if (!digits) return '';
      return digits.length > 10 ? digits.slice(-10) : digits;
    };

    const normalizedPhone = normalizePhone(phone);
    if (normalizedPhone) {
      const existingPhone = users.find((u) => normalizePhone(u.phone) === normalizedPhone);
      if (existingPhone) {
        return res.status(409).json({ message: 'Phone number already registered' });
      }
    }

    const hashed = await bcrypt.hash(password, 10);
    const inviteCode = generateInviteCode(users);

    const newUser = {
      id: generateUserId(users),
      name,
      email: normalizedEmail,
      password: hashed,
      phone: normalizedPhone || (phone || ''),
      address: address || '',
      // Always store sponsorId as the sponsor's inviteCode for consistency
      sponsorId: sponsorUser ? sponsorUser.inviteCode : (sponsorId || ''),
      // Sponsor name is always derived from sponsorUser (if any)
      sponsorName: sponsorUser ? sponsorUser.name : (sponsorName || ''),
      inviteCode,
      // Roles: member (default), franchise
      role: 'member',
      roleAssignedBy: null,
      roleAssignedAt: null,
      // Activation status is controlled by separate E-Pin store (not per-member pin)
      isActivated: false,
      activationPackage: null,
      activatedAt: null,
      balance: 0,
      totalIncome: 0,
      withdrawal: 0,
      freedomIncome: 0,
      dailyBonusIncome: 0,
      rankRewardIncome: 0,
      lastDailyCredit: new Date().toISOString().slice(0, 10),
      createdAt: new Date().toISOString(),
      // Optional extended profile fields
      gender: '',
      city: '',
      state: '',
      pinCode: '',
      age: '',
      panNo: '',
      aadhaarNo: '',
      nomineeName: '',
      nomineeRelation: '',
      upiNo: '',
      upiId: '',
      bankDetails: {
        accountHolder: '',
        bankName: '',
        accountNo: '',
        ifsc: '',
        branchName: '',
      },
    };

    // Track who invited this user (direct downline) on sponsor record
    if (sponsorUser) {
      if (!Array.isArray(sponsorUser.directInviteIds)) {
        sponsorUser.directInviteIds = [];
      }
      sponsorUser.directInviteIds.push(newUser.id);

      // Reward inviter ₹6 when someone registers using their invite code
      const reward = 6;
      sponsorUser.balance = (Number(sponsorUser.balance) || 0) + reward;
      sponsorUser.totalIncome = (Number(sponsorUser.totalIncome) || 0) + reward;
    }

    users.push(newUser);
    saveUsers(users);

    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '7d' });
    const { password: _pw, ...userWithoutSensitive } = newUser;

    res.status(201).json({ user: userWithoutSensitive, token });
  } catch (err) {
    console.error('Register error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log('Login request body:', req.body);
    const { email, username, password } = req.body;
    const loginIdentifier = username || email;

    if (!loginIdentifier || !password) {
      console.log('Login failed: Missing credentials');
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const users = loadUsers();
    const normalizedIdentifier = String(loginIdentifier).trim().toLowerCase();
    console.log('Login identifier:', normalizedIdentifier);
    
    const user = users.find((u) => {
      const uEmail = String(u.email || '').trim().toLowerCase();
      const uInviteCode = String(u.inviteCode || '').trim().toLowerCase();
      const uName = String(u.name || '').trim().toLowerCase();
      
      return uEmail === normalizedIdentifier || uInviteCode === normalizedIdentifier || uName === normalizedIdentifier;
    });

    if (!user) {
      console.log('Login failed: User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Handle plain text passwords for legacy users
    let match = false;
    if (user.password.startsWith('$2b$') || user.password.startsWith('$2a$')) {
        match = await bcrypt.compare(password, user.password);
    } else {
        // Fallback for plain text passwords (if any exist in users.json)
        match = (password === user.password);
    }

    if (!match) {
      console.log('Login failed: Password mismatch for user', user.id);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('Login success for user:', user.id);
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
    const { password: _pw, ...userWithoutSensitive } = user;

    res.json({ user: userWithoutSensitive, token });
  } catch (err) {
    console.error('Login error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
