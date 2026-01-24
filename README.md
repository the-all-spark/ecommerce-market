# About the project

**Name**: All-Inclusive Market  
**Description**: E-commerce marketplace where products from all categories are represented.

# Deploy

Application is available at the [address](https://the-all-spark.github.io/ecommerce-market/).

# Functionality

## Pages

Implemented the following pages and their functionality:

1. **About us** - the general information about the application. Also contains random product card (data is received from the API by random id number).
2. **Products** - the page where users can see all products from all categories:
   - dynamically displays the products' preview cards for the current page (according to the number of items per page);
   - includes form for searching products;
   - includes buttons for choosing 'Items per page' setting ("10-20-50-All" values for all products; while showing search results - "10-All" for more and equal than 10 products, "All" for less than 10 products);
   - includes button to switch on the 1st page (button is disabled if the current page is the first one);
   - includes the number of the current page;
   - includes navigation to previous and next pages ("previous" button is disabled if the current page is the first one; "next" button is disabled if the current page is the last one);
   - **Searching products:**
     - products' preview cards are displayed according to the searching string;
     - error message is shown if the searching string is empty or includes only spaces;
     - error message is shown if no one product was found (in this case, all products are displayed);
     - if products were found, the searching string, the total number of the found products and the number of pages (according to the number of 'items per page' setting) are displayed;
     - includes button to reset the searching results (in this case, all products are displayed);
3. **Categories** - the page where users can see all categories and their products:
   - dynamically displays the list of all categories (as a layout of the entire page);
   - if no category was chosen, shows the message;
   - if any category was chosen, displays the name of the category and the product's preview cards;
   - includes navigation via browsers' buttons (back, forward);
4. **Single product page** - the page where users can see the details of a single product:
   - user will be redirected to the product detailed page when clicking on the product's preview card (on Product or Categories pages);
   - displays the product's details (name, description, brand, availability status, category, etc.);
5. **Login (admin)** (_protected route_ - only for unauthenticated users) - the page where admin can log in to the admin panel:
   - displays the login form and demo credentials;
   - includes error message if the login failed (if the credentials are incorrect);
   - if the login was successful:
     - redirects to the admin panel;
     - changes "Login" button to "Logout" button and add account icon in header;
     - changes header' background color to dark grey;
     - admin can't access to login page unless they are logged out (login page will redirect to admin panel);
6. **Admin panel** (_protected route_ - only for authenticated admin) - the page where admin can see their personal data and users' data (data is received from the API).

## Working with API

Fetched data from the [DummyJSON API](https://dummyjson.com/docs) using TanStack Query.

- get random product card by id (for "About us" page);
- get products by searching string (for "Products" page);
- get all products (for "Products" page);
- get single product by id (for detailed product page);
- get all categories (for "Categories" page);
- get products by category (for "Categories" page);
- login admin;
- get all users (for "Admin panel" page);

Used cached data.  
Used localStorage to store admin data, "isAuthenticated" flag, "itemsPerPage" settings and other options to use them in the app.

## Others

- Created a responsive layout using Tailwind CSS (from 320px to 1536px);

# Dependencies

## Main dependencies:

- `"react"`, `"react-dom"`;
- `"tanstack/react-router"` - for file-based routing;
- `"tanstack/react-query"` - for data fetching;
- `"tailwindcss"` - for styling using Tailwind CSS;
- `"vite"` - for development server and as a build tool;
- `"gh-pages"` - for deploying the application on GitHub Pages;
- `"typescript"` - for TypeScript support;

## Other dependencies:

- `"prettier"` - for code formatting;
- `"eslint"` - for code linting;
- `"testing-library/jest-dom"`, `"testing-library/react"`, `"jsdom"`, `"vitest"` - for testing;

# How to run the app locally

## For users:

1. download the project from the repository using [link](https://github.com/the-all-spark/ecommerce-market/tree/gh-pages) ('<> Code' > 'Download ZIP');

2. run application (double-click on `index.html`).

## For developers:

1. download the project from the repository using [link](https://github.com/the-all-spark/ecommerce-market/tree/main) ('<> Code' > 'Download ZIP'), then unpack it  
   or clone the repository using git command  
   `$ git clone https://github.com/the-all-spark/ecommerce-market.git`

2. move to the application folder and open Visual Studio code (or other code editor)  
   `$ cd ecommerce-market`  
   `$ code .`

3. install dependencies  
   `$ npm install`

4. run application  
   `$ npm run dev`

5. open application in browser (using `'o' + Enter` command)
