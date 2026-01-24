import { useState } from 'react';
import { createPortal } from 'react-dom';

import { Outlet, createRootRouteWithContext, Link } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';

import logo from '/assets/images/logo.svg';
import NotFound from './-notFoundPage';
import MenuLinks from '../components/MenuLinks';
import { useAuthStore } from '../hooks/useAuthStore';

interface CustomRouterContext {
  queryClient: QueryClient;
}

const RootComponent = () => {
  const [isMenuOpen, setMenuIsOpen] = useState<boolean>(false);
  const { isAuthenticated, logout } = useAuthStore();

  const handleBurgerMenuClick = () => {
    setMenuIsOpen(!isMenuOpen);
  };

  const handleBurgerMenuLogout = () => {
    setMenuIsOpen(!isMenuOpen);
    logout();
  };

  return (
    <>
      <header
        className={`flex h-22 items-center justify-between ${isAuthenticated ? 'bg-grey-dark' : 'bg-coral'} p-4 lg:p-8`}
      >
        <div>
          <img src={logo} alt="Market logo" />
        </div>

        {/* General menu */}
        <div className="flex flex-row gap-3 max-sm:hidden">
          <ul className="flex flex-row gap-4 p-2 max-sm:flex-col max-sm:gap-0">
            <MenuLinks />
          </ul>

          {isAuthenticated ? (
            <div className="flex flex-row items-center justify-center gap-3 max-sm:flex-col max-sm:gap-0">
              <Link to="/admin">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    opacity="0.91"
                    d="M12.1822 0C11.4659 -7.52229e-08 10.7566 0.148163 10.0948 0.436029C9.43303 0.723894 8.83173 1.14583 8.32523 1.67773C7.81873 2.20964 7.41695 2.8411 7.14283 3.53607C6.86871 4.23104 6.72763 4.97591 6.72763 5.72814C6.72763 6.48037 6.86871 7.22523 7.14283 7.9202C7.41695 8.61517 7.81873 9.24664 8.32523 9.77854C8.83173 10.3104 9.43303 10.7324 10.0948 11.0202C10.7566 11.3081 11.4659 11.4563 12.1822 11.4563C13.6288 11.4563 15.0162 10.8528 16.0391 9.77854C17.062 8.70431 17.6367 7.24733 17.6367 5.72814C17.6367 4.20894 17.062 2.75197 16.0391 1.67773C15.0162 0.603498 13.6288 0 12.1822 0ZM7.47337 12.6506C3.05844 14.618 0.139332 19.106 0 24.1404C2.98607 27.7253 7.36429 30 12.2594 30C14.9409 30 18.2268 28.7247 20.4545 27.5184C19.8498 26.6697 19.0909 26.1548 17.7273 24.0267C16.63 21.675 15.7649 20.2794 15.6818 16.6093V14.5639L12.2994 20.468L7.47337 12.6506ZM23.2564 8.83656C20.8772 8.83656 16.63 11.6195 16.63 11.6195C16.7801 18.2522 19.2875 25.5922 23.2564 25.5399C23.2608 25.5399 23.2653 25.54 23.2697 25.5399C24.3852 25.525 25.3726 24.9139 26.1781 24.0267C26.9836 23.1396 27.6456 21.9593 28.1889 20.6341C29.2756 17.9837 29.8828 14.7497 29.8828 12.0838V11.7006L29.5765 11.4964C29.5765 11.4964 28.5937 10.8406 27.3366 10.1847C26.0796 9.52874 24.5824 8.83656 23.2617 8.83656H23.2564ZM23.2564 10.2266H23.2617C24.0807 10.2266 25.56 10.8122 26.748 11.4321C27.7415 11.9505 28.2798 12.3111 28.5192 12.467C28.4659 14.847 27.9219 17.7593 26.9691 20.0831C26.4686 21.3037 25.8659 22.3552 25.2193 23.0674C24.5739 23.7782 23.9242 24.1367 23.2564 24.147V10.2266Z"
                    fill="white"
                  />
                </svg>
              </Link>
              <button
                className="rounded-md border-2 border-grey-light p-1 pr-2 pl-2 text-white hover:cursor-pointer hover:bg-coral-light"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button className="rounded-md border-2 border-grey-light p-1 pr-2 pl-2 text-white hover:cursor-pointer hover:bg-coral-light">
              <Link to="/login">Login (admin)</Link>
            </button>
          )}
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
              <div className="absolute top-3 right-3 flex flex-col items-center gap-3 border-2 border-grey-light bg-grey-dark p-2 pr-3 pb-3 pl-3">
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

                {isAuthenticated ? (
                  <div className="flex flex-row items-center justify-center gap-3 max-sm:flex-col">
                    <Link to="/admin" onClick={handleBurgerMenuClick}>
                      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          opacity="0.91"
                          d="M12.1822 0C11.4659 -7.52229e-08 10.7566 0.148163 10.0948 0.436029C9.43303 0.723894 8.83173 1.14583 8.32523 1.67773C7.81873 2.20964 7.41695 2.8411 7.14283 3.53607C6.86871 4.23104 6.72763 4.97591 6.72763 5.72814C6.72763 6.48037 6.86871 7.22523 7.14283 7.9202C7.41695 8.61517 7.81873 9.24664 8.32523 9.77854C8.83173 10.3104 9.43303 10.7324 10.0948 11.0202C10.7566 11.3081 11.4659 11.4563 12.1822 11.4563C13.6288 11.4563 15.0162 10.8528 16.0391 9.77854C17.062 8.70431 17.6367 7.24733 17.6367 5.72814C17.6367 4.20894 17.062 2.75197 16.0391 1.67773C15.0162 0.603498 13.6288 0 12.1822 0ZM7.47337 12.6506C3.05844 14.618 0.139332 19.106 0 24.1404C2.98607 27.7253 7.36429 30 12.2594 30C14.9409 30 18.2268 28.7247 20.4545 27.5184C19.8498 26.6697 19.0909 26.1548 17.7273 24.0267C16.63 21.675 15.7649 20.2794 15.6818 16.6093V14.5639L12.2994 20.468L7.47337 12.6506ZM23.2564 8.83656C20.8772 8.83656 16.63 11.6195 16.63 11.6195C16.7801 18.2522 19.2875 25.5922 23.2564 25.5399C23.2608 25.5399 23.2653 25.54 23.2697 25.5399C24.3852 25.525 25.3726 24.9139 26.1781 24.0267C26.9836 23.1396 27.6456 21.9593 28.1889 20.6341C29.2756 17.9837 29.8828 14.7497 29.8828 12.0838V11.7006L29.5765 11.4964C29.5765 11.4964 28.5937 10.8406 27.3366 10.1847C26.0796 9.52874 24.5824 8.83656 23.2617 8.83656H23.2564ZM23.2564 10.2266H23.2617C24.0807 10.2266 25.56 10.8122 26.748 11.4321C27.7415 11.9505 28.2798 12.3111 28.5192 12.467C28.4659 14.847 27.9219 17.7593 26.9691 20.0831C26.4686 21.3037 25.8659 22.3552 25.2193 23.0674C24.5739 23.7782 23.9242 24.1367 23.2564 24.147V10.2266Z"
                          fill="white"
                        />
                      </svg>
                    </Link>
                    <button
                      className="rounded-md border-2 border-grey-light p-1 pr-2 pl-2 text-white hover:cursor-pointer hover:bg-coral-light"
                      onClick={handleBurgerMenuLogout}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    className="rounded-md border-2 border-grey-light p-1 pr-2 pl-2 text-white hover:cursor-pointer hover:bg-coral-light"
                    onClick={handleBurgerMenuClick}
                  >
                    <Link to="/login">Login (admin)</Link>
                  </button>
                )}
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
