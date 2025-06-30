import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { CartProvider, useCart } from '../../context/CartContext';

describe('CartContext', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('proporciona cartCount y addToCart', async () => {
        const TestComponent = () => {
            const { cartCount, addToCart } = useCart();
            return (
                <>
                    <p>Cart: {cartCount}</p>
                    <button onClick={addToCart}>Add</button>
                </>
            );
        };

        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        expect(screen.getByText('Cart: 0')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Add'));

        await waitFor(() => {
            expect(screen.getByText('Cart: 1')).toBeInTheDocument();
        });
    });

    it('lee el valor inicial desde localStorage', () => {
        localStorage.setItem('cartCount', '5');

        const TestComponent = () => {
            const { cartCount } = useCart();
            return <p>Cart: {cartCount}</p>;
        };

        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        expect(screen.getByText('Cart: 5')).toBeInTheDocument();
    });

    it('lanza error si useCart se usa fuera del CartProvider', () => {
        const TestComponent = () => {
            // Este uso indebido debe lanzar error
            useCart();
            return <div>Oops</div>;
        };

        // La función que renderiza debe estar envuelta en expect().toThrow
        expect(() => render(<TestComponent />)).toThrow(
            'useCart debe ser usado dentro de un CartProvider'
        );
    });
});
