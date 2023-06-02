import { Gallery } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({pictures, onClick}) => {

    return (
      <Gallery onClick={onClick}>
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
      </Gallery>
    );
  
}

export default ImageGallery;
