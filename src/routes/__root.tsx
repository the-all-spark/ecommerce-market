import { Link, Outlet, createRootRoute } from '@tanstack/react-router';

import { Route as aboutRoute } from './index';
import { Route as productsRoute } from './products';

import logo from '/assets/images/logo.svg';

function RootComponent() {
  return (
    <>
      <header className="flex h-22 items-center justify-between bg-coral p-4">
        <div>
          <img src={logo} alt="Market logo" />
        </div>
        <div className="flex gap-2 p-2">
          <Link
            to={aboutRoute.to}
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            About us
          </Link>
          <Link
            to={productsRoute.to}
            activeProps={{
              className: 'font-bold',
            }}
          >
            Products
          </Link>
        </div>
      </header>

      <Outlet />
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <h1>404 Not Found</h1>,
});
