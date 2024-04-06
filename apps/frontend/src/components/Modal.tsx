// import React from 'react';
// import PropTypes from 'prop-types';
// import '../modal.css'

// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   const stopPropagation = (e) => {
//     e.stopPropagation();
//   };

//   return (
//     <div className="modal-backdrop" onClick={onClose}>
//       <div className="modal-content" onClick={stopPropagation}>
//         <button className="modal-close-btn" onClick={onClose}>×</button>
//         {children}
//       </div>
//     </div>
//   );
// };

// Modal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   children: PropTypes.node.isRequired,
// };

// export default Modal;

import React from 'react';
import PropTypes from 'prop-types';
import '../modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  // Prevents modal content click from propagating to the backdrop
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  // Close modal on Escape key press
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0} 
      aria-label="Close modal" 
    >
    <div
        className="modal-content"
        onClick={stopPropagation}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
    >
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
