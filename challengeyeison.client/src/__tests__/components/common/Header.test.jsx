import { render, screen } from '@testing-library/react';
import { CartProvider } from '../../../context/CartContext';
import Header from '../../../components/common/Header';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

describe('Header Component', () => {
  test('renders logo correctly', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <Header />
        </CartProvider>
      </MemoryRouter>
    );
    const logoElement = screen.getByAltText('Logo Mercado Libre');
    expect(logoElement).toBeInTheDocument();
  });

  test('shows correct cart count', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('2');
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <CartProvider>
          <Header />
        </CartProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('2')).toBeInTheDocument();
  });
}); 