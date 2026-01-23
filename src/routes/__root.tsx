import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';

import logo from '/assets/images/logo.svg';
import NotFound from './-notFoundPage';
import MenuLinks from '../components/MenuLinks';

interface CustomRouterContext {
  queryClient: QueryClient;
}

const RootComponent = () => {
  const [isMenuOpen, setMenuIsOpen] = useState<boolean>(false);

  const handleBurgerMenuClick = () => {
    setMenuIsOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="flex h-22 items-center justify-between bg-coral p-4 lg:p-8">
        <div>
          <img src={logo} alt="Market logo" />
        </div>

        {/* General menu */}
        <div className="block max-sm:hidden">
          <ul className="flex flex-row gap-4 p-2 max-sm:flex-col max-sm:gap-0">
            <MenuLinks />
          </ul>
        </div>

        {/* Burgermenu */}
        <div className="hidden max-sm:block">
          <button
            className="p-4 text-white hover:cursor-pointer"
            onClick={handleBurgerMenuClick}
            aria-label="Open menu"
          >
            <svg width="33" height="28" viewBox="0 0 33 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                className="fill-grey-light"
                d="M0 2.33333C0 1.04271 1.05335 0 2.35714 0H30.6429C31.9467 0 33 1.04271 33 2.33333C33 3.62396 31.9467 4.66667 30.6429 4.66667H2.35714C1.05335 4.66667 0 3.62396 0 2.33333ZM0 14C0 12.7094 1.05335 11.6667 2.35714 11.6667H30.6429C31.9467 11.6667 33 12.7094 33 14C33 15.2906 31.9467 16.3333 30.6429 16.3333H2.35714C1.05335 16.3333 0 15.2906 0 14ZM33 25.6667C33 26.9573 31.9467 28 30.6429 28H2.35714C1.05335 28 0 26.9573 0 25.6667C0 24.376 1.05335 23.3333 2.35714 23.3333H30.6429C31.9467 23.3333 33 24.376 33 25.6667Z"
              />
            </svg>
          </button>

          {isMenuOpen &&
            createPortal(
              <div className="absolute top-3 right-3 flex flex-col items-center gap-3 border-2 border-grey-light bg-grey-dark p-2 pb-3">
                <button
                  className="ml-auto p-2 text-white hover:cursor-pointer"
                  onClick={handleBurgerMenuClick}
                  aria-label="Close menu"
                >
                  <svg width="33" height="28" viewBox="0 0 33 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      className="fill-grey-light"
                      d="M0.591325 0.896168C1.49075 -0.162939 3.09167 -0.303434 4.16707 0.582366L16.5 10.7409L28.8329 0.582366C29.9083 -0.303434 31.5092 -0.162939 32.4087 0.896168C33.3081 1.95528 33.1654 3.53193 32.09 4.41773L20.4567 14L32.09 23.5823C33.1654 24.4681 33.3081 26.0447 32.4087 27.1038C31.5092 28.1629 29.9083 28.3034 28.8329 27.4176L16.5 17.2591L4.16707 27.4176C3.09167 28.3034 1.49075 28.1629 0.591325 27.1038C-0.308102 26.0447 -0.165446 24.4681 0.909956 23.5823L12.5433 14L0.909956 4.41773C-0.165446 3.53193 -0.308102 1.95528 0.591325 0.896168Z"
                    />
                  </svg>
                </button>
                <ul className="flex flex-col items-center justify-center gap-4 p-2">
                  <MenuLinks onClick={handleBurgerMenuClick} />
                </ul>
              </div>,
              document.body
            )}
        </div>
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
