import styles from './LoadMoreBtn.module.css';

type LoadMoreBtnProps = {
  loading: boolean;
  updatePage: () => void;
};

function LoadMoreBtn({ loading, updatePage }: LoadMoreBtnProps) {
  return (
    <button
      type="button"
      className={styles.btn}
      onClick={updatePage}
      disabled={loading}
    >
      Load more
    </button>
  );
}

export default LoadMoreBtn;
