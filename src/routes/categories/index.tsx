import { createFileRoute } from '@tanstack/react-router';

import CategoriesListLayout from './-CategoriesListLayout';

function CategoriesIndexPage() {
  return (
    <CategoriesListLayout>
      <div className="flex-1 pt-3 pb-3 text-center">
        <p>
          <b>No one category selected.</b>
        </p>
        <p>Please, select one category from the list above.</p>
      </div>
    </CategoriesListLayout>
  );
}

export const Route = createFileRoute('/categories/')({
  component: CategoriesIndexPage,
});
