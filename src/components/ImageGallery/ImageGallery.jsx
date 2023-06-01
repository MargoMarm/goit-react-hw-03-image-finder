import { Gallery } from './ImageGallery.styled';
import getPictures from '../services/getPictures';
import { Component } from 'react';
import { Loader } from 'components/Loader/Loader';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';

class ImageGallery extends Component {
  state = {
    pictures: null,
    status: 'idle',
    isOpen: false,
    modalImgSrc: '',
  };

  componentDidUpdate(prevProps, _) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ status: 'pending' });
      getPictures(this.props.searchQuery)
        .then(response => response.json())
        .then(data =>
          this.setState({ pictures: data.hits, status: 'resolved' })
        );
    }
  }
  onModalClick = ({ target }) => {
    console.log('its working on modadl click');

    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    this.setState({ modalImgSrc: target.dataset.src });
  };

  onBtnClick = () => {
    console.log('its working on btn click');

    this.setState({ status: 'pending' });
    getPictures(this.props.searchQuery)
      .then(response => response.json())
      .then(data =>
        this.setState(prevState => ({
          pictures: [...prevState.pictures, data.hits],
          status: 'resolved',
        }))
      );
  };

  render() {
    const { pictures, status, modalImgSrc } = this.state;

    if (status === 'resolved') {
      return (
        <>
          <Gallery onClick={this.onModalClick}>
            {pictures.map(({ id, webformatURL, largeImageURL, tags }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  imgSrc={webformatURL}
                  alt={tags}
                  imgModal={largeImageURL}
                />
              );
            })}
            {this.state.isOpen && <Modal imgSrc={modalImgSrc} />}
          </Gallery>
          <Button onClick={this.onBtnClick}></Button>
        </>
      );
    } else if (status === 'pending') {
      return <Loader />;
    }
  }
}

export default ImageGallery;
