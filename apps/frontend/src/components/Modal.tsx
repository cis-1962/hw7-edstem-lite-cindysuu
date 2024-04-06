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

  // The backdrop listens for click to close modal,
  // but now with proper role, tabIndex, and keyboard support
  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="button" // Assign a role indicating this is an interactive element
      tabIndex={0} // Make it focusable
      aria-label="Close modal" // Provide an accessible name
    >
      <div
        className="modal-content"
        onClick={stopPropagation} // Prevent click from closing the modal
        // Removed tabIndex here as this div isn't directly interactive
        // No need for role or aria-label as this part isn't an interactive target
      >
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close" // Clearly label the button's action
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
