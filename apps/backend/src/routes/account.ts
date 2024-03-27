import express from 'express';
import User from '../models/user';
import requireAuth from '../middlewares/require-auth';

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = new User({ username, password });
        await newUser.save();
        req.session.username = newUser.username;
        res.status(201).send('User created successfully');
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && user.password === password) {
        req.session.username = user.username;
        res.send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
})

// Logout route
router.post('/logout', requireAuth, (req, res) => {
    req.session = null;
    res.send('Logged out successfully');
})

export default router;