import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';

import logo from '/assets/images/logo.svg';
import NotFound from './-notFoundPage';

interface CustomRouterContext {
  queryClient: QueryClient;
}

interface LinkProps {
  id: number;
  name: string;
  to: string;
  activeOptions?: {
    exact?: boolean;
  };
}

const links: LinkProps[] = [
  {
    id: 1,
    name: 'About us',
    to: '/',
    activeOptions: { exact: true },
  },
  {
    id: 2,
    name: 'Products',
    to: '/products',
  },
  {
    id: 3,
    name: 'Categories',
    to: '/categories',
  },
];

const RootComponent = () => {
  return (
    <>
      <header className="flex h-22 items-center justify-between bg-coral p-4 lg:p-8">
        <div>
          <img src={logo} alt="Market logo" />
        </div>

        <ul className="flex gap-4 p-2">
          {links.map((link) => (
            <li className="text-white" key={link.id}>
              <Link
                to={link.to}
                activeProps={{
                  className: 'p-2 rounded-md border-b-2 border-grey-middle',
                }}
                inactiveProps={{
                  className: 'p-2 rounded-md border-b-2 border-transparent hover:bg-coral-light',
                }}
                activeOptions={link.activeOptions ? link.activeOptions : {}}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </header>

      <div className="flex min-h-[85vh] flex-col bg-grey-light">
        <Outlet />
      </div>
    </>
  );
};

export const Route = createRootRouteWithContext<CustomRouterContext>()({
  component: RootComponent,
  notFoundComponent: NotFound,
});
