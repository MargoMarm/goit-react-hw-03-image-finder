import { GalleryItem, Image } from './ImageGalleryItem.styled';


const ImageGalleryItem = ({ imgSrc, alt, imgModal }) => {
	return (
    <GalleryItem>
      <Image src={imgSrc} alt={alt} data-src={imgModal} />
    </GalleryItem>
  );

};

export default ImageGalleryItem;
