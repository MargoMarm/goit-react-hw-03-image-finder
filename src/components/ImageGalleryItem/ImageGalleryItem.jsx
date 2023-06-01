import { GalleryItem, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ imgSrc, alt}) => {
	return (
  <GalleryItem>
    <Image src={imgSrc} alt={alt} />
  </GalleryItem>

	)
};

export default ImageGalleryItem;
