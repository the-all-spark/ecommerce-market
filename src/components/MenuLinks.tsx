import { Link } from '@tanstack/react-router';

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

interface MenuLinksProps {
  onClick?: () => void;
}

const MenuLinks = ({ onClick }: MenuLinksProps) => {
  return (
    <>
      {links.map((link) => (
        <li className="text-white" key={link.id} onClick={onClick}>
          <Link
            to={link.to}
            activeProps={{
              className: 'p-2 rounded-md border-b-2 border-grey-middle max-sm:p-1',
            }}
            inactiveProps={{
              className: 'p-2 rounded-md border-b-2 border-transparent hover:bg-coral-light max-sm:p-1',
            }}
            activeOptions={link.activeOptions ? link.activeOptions : {}}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </>
  );
};

export default MenuLinks;
