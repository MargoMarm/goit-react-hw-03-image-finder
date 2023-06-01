import { Gallery } from './ImageGallery.styled';
import getPictures from '../services/getPictures';
import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';


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
  onModalClick = ({target}) => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
	  this.setState({ modalImgSrc: target.dataset.src });
  };
  render() {
    const { pictures, status, modalImgSrc } = this.state;

    if (status === 'resolved') {
      return (
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
      );
    } else if (status === 'pending') {
      return <Loader />;
    }
  }
}

export default ImageGallery;
