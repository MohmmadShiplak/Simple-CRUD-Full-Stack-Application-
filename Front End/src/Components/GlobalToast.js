// GlobalToast.js
import { Toast, ToastContainer } from 'react-bootstrap';

const GlobalToast = ({ isVisible, message, type, onClose }) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast 
        show={isVisible} 
        onClose={onClose}
        delay={3000} 
        autohide
        bg={type}
      >
        <Toast.Header>
          <strong className="me-auto text-capitalize">
            {type}
          </strong>
        </Toast.Header>
        <Toast.Body className={type === 'light' ? 'text-dark' : 'text-white'}>
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default GlobalToast;