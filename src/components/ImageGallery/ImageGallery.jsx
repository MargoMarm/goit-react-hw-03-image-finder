import { Gallery } from './ImageGallery.styled';
import getPictures from '../services/getPictures';
import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  state = {
    pictures: null,
  };
  componentDidUpdate(prevProps, _) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      getPictures(this.props.searchQuery)
        .then(response => response.json())
        .then((data) => this.setState({ pictures: data.hits }));
    }
  }

  render() {
	  const { pictures } = this.state;
    return (
      <Gallery>
        {pictures &&
				 pictures.map(({ id, webformatURL, largeImageURL, tags }) => {
					 return <ImageGalleryItem key={id} imgSrc={webformatURL} alt={ tags} />;
          })}
      </Gallery>
    );
  }
}

export default ImageGallery;
