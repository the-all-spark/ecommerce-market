import { Suspense, useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { allProductsQueryOptions } from '../../api/customQueryOptions';
import AllPreviewCards from '../../components/AllPreviewCards';

// * List of products' preview cards
function ProductsList() {
  const [currentPage, setCurrentPage] = useState(Number(localStorage.getItem('currentPage')) || 0);
  const [itemsPerPage, setItemsPerPage] = useState(Number(localStorage.getItem('itemsPerPage')) || 50);

  const { data, status } = useSuspenseQuery(allProductsQueryOptions(currentPage, itemsPerPage));

  const itemsAmount = [10, 20, 50, data.total];
  let totalPages = Math.ceil(data?.total / itemsPerPage);

  const handleChangeItemsPerPage = (amount: number) => {
    setItemsPerPage(amount);
    setCurrentPage(0);
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

  // ! delete
  if (status === 'success') {
    console.log(data); //!
  }

  return (
    <>
      <h1 className="pt-6 text-center font-heading text-h1/8">Get acquainted with all products!</h1>
      <div className="flex flex-row items-center justify-center gap-2 pt-3">
        <p>Items per page:</p>
        {itemsAmount.map((amount) => (
          <button
            key={amount}
            className={`rounded-md border-2 p-2 pt-1 pb-1 hover:cursor-pointer ${
              itemsPerPage === amount
                ? 'border-2 border-transparent bg-grey-dark text-white'
                : 'border-2 border-grey-middle bg-white text-black'
            }`}
            onClick={() => handleChangeItemsPerPage(amount)}
          >
            {amount === data.total ? 'All' : amount}
          </button>
        ))}
      </div>

      <div className="flex flex-row items-center justify-center gap-3 pt-4">
        <button
          className={`rounded-md border-2 border-grey-middle bg-white p-2 pt-1 pb-1 ${currentPage === 0 ? 'text-grey-dark hover:cursor-not-allowed' : 'text-black hover:cursor-pointer'}`}
          onClick={handleResetCurrentPage}
          disabled={currentPage === 0}
        >
          Show from Page 1
        </button>
        <p className="text-center text-large font-bold text-coral">Page: {currentPage + 1}</p>
      </div>

      {status === 'success' && <AllPreviewCards products={data.products} />}

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
