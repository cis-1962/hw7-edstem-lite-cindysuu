import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionText: String,
  answer: String,
  author: String,
});

const Question = mongoose.model('Question', questionSchema);

export default Question;
