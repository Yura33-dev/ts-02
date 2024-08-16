import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Grid as GridLoader } from 'react-loader-spinner';
import ReactModal from 'react-modal';

import { fetchPhotos } from './api/unsplash-api';

import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import { IModalState, ITransformedData } from './types/commonTypes';

ReactModal.setAppElement('#root');

type queryStringType = string | null;

function App() {
  const [photos, setPhotos] = useState<ITransformedData[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [showModal, setShowModal] = useState<IModalState>({
    isOpen: false,
    photo: null,
  });

  const [query, setQuery] = useState<queryStringType>(null);
  const [page, setPage] = useState(1);

  function updateQuery(string: queryStringType) {
    setPage(1);
    setQuery(string);
  }

  function updatePage() {
    setPage(page + 1);
  }

  useEffect(() => {
    makeRequest(query, page);
  }, [query, page]);

  function makeRequest(query: queryStringType, page: number) {
    if (query) {
      setLoading(true);
      setError(false);

      fetchPhotos(query, page)
        .then((data: ITransformedData[]) => {
          if (data.length === 0) {
            return toast.error('No results for your query!', {
              duration: 3500,
              position: 'top-right',
            });
          }

          if (page > 1) {
            setPhotos(prevPhotos => [...prevPhotos, ...data]);
          } else {
            setPhotos(data);
          }
        })
        .catch(e => {
          setError(true);

          toast.error(e.message, {
            duration: 3000,
            position: 'top-right',
          });
        })
        .finally(() => setLoading(false));
    }
  }

  function openImage(photo: object) {
    setShowModal({ isOpen: true, photo });
  }

  function closeImage() {
    setShowModal({ isOpen: false, photo: null });
  }

  return (
    <>
      <SearchBar onSubmit={updateQuery} />
      {error && <ErrorMessage />}
      {photos.length > 0 && !error && (
        <ImageGallery photos={photos} onOpen={openImage} />
      )}
      <GridLoader
        visible={loading}
        height="130"
        width="130"
        color="#ffb6c1"
        ariaLabel="grid-loading"
        radius="12"
        wrapperStyle={{}}
        wrapperClass="load-wrapper"
      />
      {photos.length > 0 && !error && (
        <LoadMoreBtn loading={loading} updatePage={updatePage} />
      )}
      <Toaster />
      <ImageModal showModal={showModal} closeModal={closeImage} />
    </>
  );
}

export default App;
