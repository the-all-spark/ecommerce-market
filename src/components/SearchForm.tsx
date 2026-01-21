import { useRef } from 'react';

interface SearchFormProps {
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const SearchForm = ({ setSearchString, setCurrentPage, setItemsPerPage }: SearchFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchString = inputRef.current?.value || '';
    setSearchString(searchString);

    setCurrentPage(0);
    setItemsPerPage(10);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={(e) => handleSearchInput(e)} className="flex flex-row items-center gap-2">
      <input
        name="searchValue"
        type="text"
        ref={inputRef}
        placeholder="Search product..."
        className="rounded-md border-2 border-coral bg-white p-2 pt-1 pb-1"
      />
      <button type="submit" aria-label="Search" className="hover:cursor-pointer" title="Search">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            className="fill-coral"
            d="M19.2155 11.2552C19.2155 6.85868 15.6518 3.29428 11.2552 3.29414C6.85859 3.29414 3.29414 6.85859 3.29414 11.2552C3.29428 15.6518 6.85868 19.2155 11.2552 19.2155C15.6517 19.2154 19.2154 15.6517 19.2155 11.2552ZM22.5097 11.2552C22.5096 13.7665 21.6868 16.0853 20.2964 17.9577L27.5184 25.1894C28.1612 25.833 28.1604 26.8756 27.5168 27.5184C26.8732 28.1612 25.8305 28.1604 25.1878 27.5168L17.9682 20.2884C16.0939 21.6835 13.7713 22.5096 11.2552 22.5097C5.03938 22.5097 0.00014516 17.4711 0 11.2552C0 5.03929 5.03929 0 11.2552 0C17.4711 0.000145169 22.5097 5.03938 22.5097 11.2552Z"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchForm;
