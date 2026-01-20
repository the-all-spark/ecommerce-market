import { Outlet, Link, useLocation } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { allCategoriesQueryOptions } from '../../api/customQueryOptions';
import type { AllCategoriesResponse } from '../../types/responseTypes';

interface CategoriesListLayoutProps {
  children?: React.ReactNode;
}

// * List of all categories
function CategoriesListLayout({ children }: CategoriesListLayoutProps) {
  const { data: categories, status } = useSuspenseQuery(allCategoriesQueryOptions);

  let location = useLocation();
  const pathSegments = location.pathname.split('/');
  const currentCategory = pathSegments[pathSegments.length - 1] || '';

  let list: React.ReactNode;

  function getButtonStyle(categorySlug: string) {
    return currentCategory === categorySlug
      ? 'bg-coral text-white border-2 border-transparent'
      : 'bg-white text-black border-2 border-grey-middle';
  }

  if (status === 'success') {
    list = (
      <ul className="flex flex-row flex-wrap justify-center gap-2 bg-white p-5 pr-6 pl-5">
        {categories.map((category: AllCategoriesResponse) => (
          <li
            className={`rounded-md p-3 pt-1 pb-1 text-normal ${getButtonStyle(category.slug)} hover:cursor-pointer`}
            key={category.slug}
          >
            <Link key={category.slug} to="/categories/$category" params={{ category: category.slug }}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <h1 className="pt-6 text-center font-heading text-h1/8">Choose category:</h1>
      {list}
      {children || <Outlet />}
    </>
  );
}

export default CategoriesListLayout;
