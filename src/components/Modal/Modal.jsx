import { Component } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hanleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.hanleKeyDown);
  }
  hanleKeyDown = e => {
    if (e.code === 'Escape') this.props.onClose();
  };

  handleOverayClick = e => {
    if (e.target === e.currentTarget) this.props.onClose();
  };
  render() {
    const { imgSrc, alt } = this.props;

    return (
      <Overlay onClick={this.handleOverayClick}>
        <ModalWindow>
          <img src={imgSrc} alt={alt} />
        </ModalWindow>
      </Overlay>
    );
  }
}

export default Modal;
