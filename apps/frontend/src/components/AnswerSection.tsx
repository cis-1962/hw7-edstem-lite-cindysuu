import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../homepage.css';

const AnswerSection = ({ question, onAnswerSubmit }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAnswerSubmit(answer, question.id);
    setAnswer(''); // Clear the input after submission
  };

  return (
    <div className="answer-section">
      <h3>{question.questionText}</h3>
      <p><strong>Author:</strong> {question.author}</p>
      <p><strong>Answer:</strong> {question.answer}</p>
      <form onSubmit={handleSubmit}>
        <textarea
          className="answer-textarea"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Answer this question:"
          rows={4}
        />
        <button type="submit" className="answer-submit-btn">
          Submit Answer
        </button>
      </form>
    </div>
  );
};

AnswerSection.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    questionText: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    answer: PropTypes.string,
  }).isRequired,
  onAnswerSubmit: PropTypes.func.isRequired,
};

export default AnswerSection;
