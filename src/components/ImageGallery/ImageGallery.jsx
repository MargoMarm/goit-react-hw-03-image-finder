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
    page: 1,
    status: 'idle',
    isOpen: false,
    modalImgSrc: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ status: 'pending' });
      getPictures(this.props.searchQuery, this.state.page)
        .then(response => response.json())
        .then(data => {
          this.setState({ pictures: data.hits, status: 'resolved' });
        });
    }
    if (prevState.page !== this.state.page) {
      this.setState({ status: 'pending' });

      getPictures(this.props.searchQuery, this.state.page)
        .then(response => response.json())
        .then(data =>
          this.setState(prevState => {
            return {
              pictures: [...prevState.pictures, ...data.hits],
              status: 'resolved',
            };
          })
        );
    }
  }
  onModalClick = ({ target }) => {
    console.log('its working on modadl click');

    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    this.setState({ modalImgSrc: target.dataset.src });
  };

  onBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
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
