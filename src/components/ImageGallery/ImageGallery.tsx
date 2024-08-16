import { ITransformedData } from '../../types/commonTypes';
import ImageCard from '../ImageCard/ImageCard';

import styles from './ImageGallery.module.css';

type ImageGalleryProps = {
  photos: ITransformedData[];
  onOpen: (arg: object) => void;
};

function ImageGallery({ photos, onOpen }: ImageGalleryProps) {
  return (
    <ul className={styles.ul}>
      {photos.map(photo => (
        <li key={photo.id} className={styles.li}>
          <ImageCard photo={photo} modal={false} onOpen={onOpen} />
        </li>
      ))}
    </ul>
  );
}
export default ImageGallery;
