/// <reference types="../express-types.d.ts" />

import express from 'express';
import User from '../models/user';
import requireAuth from '../middlewares/require-auth';

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log("User already exists");
            return res.status(400).send('User already exists');
        }

        const newUser = new User({ username, password });
        await newUser.save();
        console.log("newUser:", newUser);
        req.session.username = newUser.username;
        console.log("Created!");
        res.status(201).send('User created successfully');
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user && user.password === password) {
            req.session.username = user.username;
            res.send('Login successful');
            console.log('Login successful');
            console.log('Session object:', req.session);
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send('Something went wrong on the server-side')
    }  
})

// Status route
router.get('/status', (req, res) => {
    console.log('Checking session status for username...');
    console.log('Session object:', req.session);
    console.log(req.session);

    if (req.session && req.session.username) {
        console.log('User is logged in:', req.session.username);
        res.json({ loggedIn: true, username: req.session.username });
        // res.send(`Logged in as ${req.session.username}`);
    } else {
        console.log("User is not logged in")
        res.json({ loggedIn: false });
        // res.status(401).send('Not logged in');
    }
});

// Logout route
router.post('/logout', requireAuth, (req, res) => {
    // req.session = null;
    // res.send('Logged out successfully');
    req.session.destroy((err) => {
        if (err) {
            // handle error (optional)
            return res.status(500).send('Failed to log out');
        }
        res.send('Logged out successfully');
    });
})

export default router;