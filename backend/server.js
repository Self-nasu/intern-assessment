const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
const PORT = 5000;

const JWT_SECRET = process.env.JWT_SECRET;
const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI)
  .then(() => console.log('connected to "intern" . Done'))
  .catch(err => console.error('connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: String,
    phone: String,
    password: { type: String, required: true },
    profileImage: String,
});

const User = mongoose.model('User', userSchema);

// for auth sevrice
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Access denied' });

    jwt.verify(token.split(' ')[1], JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

// my cust apis
app.post('/api/signup', async (req, res) => {
    const { email, name, phone, password, profileImage } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, name, phone, password: hashedPassword, profileImage });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to register user', details: err.message });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ error: 'Failed to log in', details: err.message });
    }
});

app.get('/api/user', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user', details: err.message });
    }
});

app.put('/api/user', authenticateToken, async (req, res) => {
    try {
        const { name, phone, profileImage } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, { name, phone, profileImage }, { new: true });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user', details: err.message });
    }
});

app.delete('/api/user', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user', details: err.message });
    }
});

app.get('/api/total-users', async (req, res) => {
    try {
        const count = await User.countDocuments();
        res.json({ totalUsers: count });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch total users count', details: err.message });
    }
});

// Fetch all users data
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users', details: err.message });
    }
});


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
