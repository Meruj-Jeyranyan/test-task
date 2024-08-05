import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children?: React.ReactNode; // Add this line
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <Overlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                {title && <Header>{title}</Header>}
                <Body>{children}</Body>
                <Footer>
                    <CloseButton onClick={onClose}>Close</CloseButton>
                </Footer>
            </ModalContent>
        </Overlay>,
        document.body
    );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 15px;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
`;

const Body = styled.div`
  padding: 20px;
  flex: 1;
`;

const Footer = styled.div`
  padding: 15px;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

export default Modal;
