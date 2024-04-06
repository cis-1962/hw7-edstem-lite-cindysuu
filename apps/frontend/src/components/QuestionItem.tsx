// QuestionItem.js
import React from 'react';
import PropTypes from 'prop-types';

const QuestionItem = ({ question, onSelect }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSelect(question);
    }
  }

  return (
    <div className="question-item" 
      onClick={() => onSelect(question)}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-pressed="false"
    >
      {question.questionText}
    </div>
  );
};

QuestionItem.propTypes = {
  question: PropTypes.shape({
    questionText: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default QuestionItem;
