require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Secret key for signing JWTs
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

// In-memory "database" — swap with real DB in production
let users = [];

/**
 * REGISTER
 * POST /register
 * body: { email, password }
 */
app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // simple validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }

        // check if user already exists
        const existing = users.find(u => u.email === email);
        if (existing) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // hash password
        const hashed = await bcrypt.hash(password, 10);

        // create user
        const user = { id: users.length + 1, email, password: hashed };
        users.push(user);

        // sign token
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(201).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * LOGIN
 * POST /login
 * body: { email, password }
 */
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // find user
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // compare password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // sign new token
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * AUTH MIDDLEWARE
 * Protects routes by validating bearer token
 */
function authenticateToken(req, res, next) {
    const auth = req.headers['authorization'];
    if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = auth.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
}

/**
 * ME
 * GET /me
 * header: Authorization: Bearer <token>
 */
app.get('/me', authenticateToken, (req, res) => {
    // req.user contains decoded JWT payload
    res.json({ user: req.user });
});

// start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Auth server running on http://localhost:${PORT}`);
});
