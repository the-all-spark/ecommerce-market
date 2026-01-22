import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import SearchForm from '../SearchForm';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('SearchForm', () => {
  test('search button is present on the screen', () => {
    render(<SearchForm setCurrentPage={() => {}} setItemsPerPage={() => {}} setSearchString={() => {}} />);
    expect(screen.getByTestId('search-btn')).toBeInTheDocument();
  });

  test('form onSubmit fires handleSearchInput and resets currentPage and itemsPerPage', () => {
    const mockSetCurrentPage = vi.fn();
    const mockSetItemsPerPage = vi.fn();

    render(
      <SearchForm setCurrentPage={mockSetCurrentPage} setItemsPerPage={mockSetItemsPerPage} setSearchString={vi.fn()} />
    );

    const form = screen.getByTestId('submit-form');
    fireEvent.submit(form);

    expect(mockSetCurrentPage).toHaveBeenCalled();
    expect(mockSetItemsPerPage).toHaveBeenCalled();
  });

  test('form onSubmit fires setSearchString with entered text', () => {
    const mockSetSearchString = vi.fn();

    render(<SearchForm setCurrentPage={vi.fn()} setItemsPerPage={vi.fn()} setSearchString={mockSetSearchString} />);

    const searchInput = screen.getByPlaceholderText('Search product...');
    fireEvent.input(searchInput, { target: { value: '  test query   ' } });

    const form = screen.getByTestId('submit-form');
    fireEvent.submit(form);

    expect(mockSetSearchString).toHaveBeenCalledWith('testquery');
  });

  test('error message is appeared after empty request', () => {
    render(<SearchForm setCurrentPage={() => {}} setItemsPerPage={() => {}} setSearchString={() => {}} />);

    const searchInput = screen.getByPlaceholderText('Search product...');
    const form = screen.getByTestId('submit-form');

    expect(screen.queryByText('Please, enter a search string.')).not.toBeInTheDocument();

    fireEvent.input(searchInput, { target: { value: '' } });
    fireEvent.submit(form);

    expect(screen.getByText('Please, enter a search string.')).toBeInTheDocument();
  });

  test('error message is disappeared after non-empty request', () => {
    render(<SearchForm setCurrentPage={() => {}} setItemsPerPage={() => {}} setSearchString={() => {}} />);

    const searchInput = screen.getByPlaceholderText('Search product...');
    const form = screen.getByTestId('submit-form');

    fireEvent.input(searchInput, { target: { value: '' } });
    fireEvent.submit(form);

    expect(screen.getByText('Please, enter a search string.')).toBeInTheDocument();

    fireEvent.input(searchInput, { target: { value: 'testquery' } });
    fireEvent.submit(form);

    expect(screen.queryByText('Please, enter a search string.')).not.toBeInTheDocument();
  });
});
