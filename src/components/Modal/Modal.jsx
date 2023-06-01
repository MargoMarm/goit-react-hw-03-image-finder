import { ModalWindow, Overlay } from './Modal.styled';

const Modal = ({ imgSrc, alt }) => {
  return (
    <Overlay>
      <ModalWindow>
        <img src={imgSrc} alt={alt} />
      </ModalWindow>
    </Overlay>
  );
};

export default Modal;
