import { Suspense, useEffect, useState } from 'react';

import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { allProductsQueryOptions, searchProductsQueryOptions } from '../../api/customQueryOptions';
import AllPreviewCards from '../../components/AllPreviewCards';
import SearchForm from '../../components/SearchForm';

// * List of products' preview cards
function ProductsList() {
  const [currentPage, setCurrentPage] = useState(Number(localStorage.getItem('currentPage')) || 0);
  const [itemsPerPage, setItemsPerPage] = useState(Number(localStorage.getItem('itemsPerPage')) || 50);
  const [currentSearchString, setCurrentSearchString] = useState('*');

  const { data } = useSuspenseQuery(allProductsQueryOptions(currentPage, itemsPerPage));
  const { data: searchData } = useSuspenseQuery(
    searchProductsQueryOptions(currentSearchString, currentPage, itemsPerPage)
  );

  console.log(itemsPerPage);

  let itemsAmount: number[];
  let totalPages: number;

  if (searchData.products.length > 0) {
    if (searchData.total <= 10) {
      itemsAmount = [searchData.total];
    } else {
      itemsAmount = [10, searchData.total];
    }
    totalPages = Math.ceil(searchData?.total / itemsPerPage);
  } else {
    itemsAmount = [10, 20, 50, data.total];
    totalPages = Math.ceil(data?.total / itemsPerPage);
  }

  const handleChangeItemsPerPage = (amount: number) => {
    setItemsPerPage(amount);
    setCurrentPage(0);
  };

  const handleReset = () => {
    setCurrentSearchString('*');
    setCurrentPage(0);
    setItemsPerPage(50);
  };

  const handleResetCurrentPage = () => {
    setCurrentPage(0);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('itemsPerPage', itemsPerPage.toString());
  }, [itemsPerPage]);

  console.log(data); //!
  console.log(searchData); //!

  return (
    <>
      <h1 className="pt-6 text-center font-heading text-h1/8">Get acquainted with all products!</h1>
      <div className="flex flex-row items-center justify-center gap-7 bg-white pt-4 pb-4">
        <SearchForm
          setSearchString={setCurrentSearchString}
          setCurrentPage={setCurrentPage}
          setItemsPerPage={setItemsPerPage}
        />

        <div className="flex flex-row items-center justify-center gap-1">
          <p>Items per page:</p>
          {itemsAmount.map((amount, index) => (
            <button
              key={index}
              className={`rounded-md border-2 p-2 pt-1 pb-1 hover:cursor-pointer ${
                itemsPerPage === amount
                  ? 'border-2 border-transparent bg-grey-dark text-white'
                  : 'border-2 border-grey-middle bg-white text-black'
              }`}
              onClick={() => handleChangeItemsPerPage(amount)}
            >
              {amount === itemsAmount[itemsAmount.length - 1] ? 'All' : amount}
            </button>
          ))}
        </div>
      </div>

      {currentSearchString !== '*' ? (
        searchData.products.length > 0 ? (
          <div className="flex flex-row items-center justify-center gap-6 pt-3">
            <div className="pt-2 pb-1 text-right">
              <p>
                You are searching for <b>'{currentSearchString}'</b>.
              </p>
              <p>
                Found: <b>{itemsAmount[itemsAmount.length - 1]}</b> products on <b>{totalPages}</b> page(-s).
              </p>
            </div>

            <button aria-label="Reset" onClick={handleReset} className="hover:cursor-pointer" title="Reset">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  className="fill-grey-dark"
                  d="M12.5 0V2.77777C17.8597 2.77777 22.2222 7.13889 22.2222 12.5C22.2222 17.8611 17.8597 22.2222 12.5 22.2222C7.14027 22.2222 2.77777 17.8611 2.77777 12.5C2.77777 9.93473 3.79861 7.51944 5.55556 5.71944V9.02777H8.33333V1.38889H0.69444V4.16667H3.18194C1.15417 6.43333 0 9.3875 0 12.5C0 19.3917 5.60694 25 12.5 25C19.3931 25 25 19.3917 25 12.5C25 5.60833 19.3931 0 12.5 0Z"
                />
              </svg>
            </button>
          </div>
        ) : (
          <p className="pt-3 pb-1 text-center">
            <b>No products</b> found according to search criteria.
          </p>
        )
      ) : null}

      <div className="flex flex-row items-center justify-center gap-3 pt-4">
        <button
          className={`rounded-md border-2 border-grey-middle bg-white p-2 pt-1 pb-1 ${currentPage === 0 ? 'text-grey-dark hover:cursor-not-allowed' : 'text-black hover:cursor-pointer'}`}
          onClick={handleResetCurrentPage}
          disabled={currentPage === 0}
        >
          Back to Page 1
        </button>
        <p className="text-center text-large font-bold text-coral">Page: {currentPage + 1}</p>
      </div>

      {searchData.products.length > 0 ? (
        <AllPreviewCards products={searchData.products} />
      ) : (
        <AllPreviewCards products={data.products} />
      )}

      <div className="mb-8 flex flex-row items-center justify-center gap-4 pt-3 pb-3">
        <button
          className={`w-35 rounded-md border-2 border-grey-middle bg-white p-2 ${currentPage === 0 ? 'text-grey-dark hover:cursor-not-allowed' : 'text-black hover:cursor-pointer'} `}
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
        >
          ← Previous
        </button>

        <p className="text-large font-bold text-coral">Page: {currentPage + 1}</p>

        <button
          className={`w-35 rounded-md border-2 border-grey-middle bg-white p-2 ${currentPage + 1 >= totalPages ? 'text-grey-dark hover:cursor-not-allowed' : 'text-black hover:cursor-pointer'} `}
          onClick={handleNextPage}
          disabled={currentPage + 1 >= totalPages}
        >
          Next →
        </button>
      </div>
    </>
  );
}

function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      <ProductsList />
    </Suspense>
  );
}

export const Route = createFileRoute('/products/')({
  component: ProductsPage,
});
