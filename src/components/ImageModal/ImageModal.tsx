import ReactModal from 'react-modal';
import { HiXMark } from 'react-icons/hi2';
import { IModalState } from '../../types/commonTypes';
import ImageCard from '../ImageCard/ImageCard';

import './ImageModal.css';

type ImageModalProps = {
  showModal: IModalState;
  closeModal: () => void;
};

function ImageModal({ showModal, closeModal }: ImageModalProps) {
  return (
    <ReactModal
      isOpen={showModal.isOpen}
      contentLabel="Minimal Modal Example"
      shouldCloseOnOverlayClick={true}
      onRequestClose={closeModal}
      className={'modal'}
      overlayClassName={'overlay'}
      closeTimeoutMS={150}
    >
      <HiXMark
        title="Icon for close image"
        size={40}
        color="white"
        onClick={closeModal}
      />

      {showModal.photo && <ImageCard photo={showModal.photo} modal={true} />}
    </ReactModal>
  );
}

export default ImageModal;
