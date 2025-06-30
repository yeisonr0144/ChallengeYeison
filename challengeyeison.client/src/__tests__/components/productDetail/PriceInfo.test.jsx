import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PriceInfo from '../../../components/productDetail/PriceInfo';

// 🔵 Mockeamos el componente QuantitySelect directamente
vi.mock('../../../components/productDetail/QuantitySelect', () => ({
    default: ({ stock }) => <div data-testid="quantity-select">Cantidad ({stock})</div>
}));

// 🔵 Mockeamos el hook useCart con vi.fn()
const mockAddToCart = vi.fn();
vi.mock('../../../context/CartContext', () => ({
    useCart: () => ({ addToCart: mockAddToCart }),
}));

describe('PriceInfo', () => {
    const stock = 5;
    const sellerName = 'MiTienda';

    it('renderiza el contenido correctamente', () => {
        render(<PriceInfo stock={stock} sellerName={sellerName} />);

        expect(screen.getByText(/Envío gratis/i)).toBeInTheDocument();
        expect(screen.getByText(/Stock disponible/i)).toBeInTheDocument();
        expect(screen.getByTestId('quantity-select')).toHaveTextContent(`Cantidad (${stock})`);
        expect(screen.getByText('Comprar ahora')).toBeInTheDocument();
        expect(screen.getByText('Agregar al carrito')).toBeInTheDocument();
        expect(screen.getByText(sellerName)).toBeInTheDocument();
    });

    it('deshabilita botones si no hay stock', () => {
        render(<PriceInfo stock={0} sellerName={sellerName} />);
        expect(screen.getByText('Comprar ahora')).toBeDisabled();
        expect(screen.getByText('Agregar al carrito')).toBeDisabled();
    });

    it('llama a addToCart al hacer click', () => {
        render(<PriceInfo stock={3} sellerName={sellerName} />);
        fireEvent.click(screen.getByText('Agregar al carrito'));
        expect(mockAddToCart).toHaveBeenCalled();
    });
});
