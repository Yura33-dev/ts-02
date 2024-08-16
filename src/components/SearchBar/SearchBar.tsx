import { FormEvent } from 'react';
import styles from './SearchBar.module.css';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

type onSubmitFuncType = { onSubmit: (arg: string) => void };

function SearchBar({ onSubmit }: onSubmitFuncType) {
  function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const search = event.currentTarget.elements.namedItem(
      'search'
    ) as HTMLInputElement;

    const searchString = search.value.trim();

    if (!searchString) {
      return toast('Your query shouldn`t be empty', {
        duration: 3000,
        position: 'top-right',
        icon: '⚠️',
      });
    }

    onSubmit(searchString);
  }

  return (
    <header className={styles.header}>
      <form onSubmit={submitHandler} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
        />
        <button className={styles.btn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
export default SearchBar;
