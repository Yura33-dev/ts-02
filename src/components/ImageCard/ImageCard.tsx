import { ITransformedData } from '../../types/commonTypes';

import styles from './ImageCard.module.css';

type ImageCardProps = {
  photo: ITransformedData;
  modal: boolean;
  onOpen: (arg: object) => void;
};

function ImageCard({ photo, modal, onOpen }: ImageCardProps) {
  function clickHandler() {
    if (!modal) {
      onOpen(photo);
    }
  }

  return (
    <div className={styles.wrapper}>
      <img
        className={styles.img}
        src={modal ? photo.fullImg : photo.thumbImg}
        alt={photo.alt}
        onClick={clickHandler}
      />
    </div>
  );
}

export default ImageCard;
