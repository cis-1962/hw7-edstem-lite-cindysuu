import express from 'express';
import Question from '../models/question';
import requireAuth from '../middlewares/require-auth';

const router = express.Router();

// Get all questions route
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        res.status(500).send(error);
    }
})

// Add a new question route
router.post('/add', requireAuth, async (req, res) => {
    const { questionText } = req.body;
    const author = req.session.username;
    try {
        const newQuestion = new Question({ questionText, author });
        await newQuestion.save();
        res.status(201).send('Question added successfully');
    } catch (error) {
        res.status(400).send(error);
    }
});

// Update an answer to a question route
router.post('/answer', requireAuth, async (req, res) => {
    const { _id, answer } = req.body;
    try {
        await Question.findByIdAndUpdate( _id, { answer });
        res.send("Answer updated successfully");
    } catch (error) {
        res.status(400).send(error);
    }
});

export default router;