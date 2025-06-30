import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BodyLayout from '../../../components/common/BodyLayout';

// Mock del componente ProductLayout
vi.mock('../../../components/productDetail/ProductLayout', () => ({
    __esModule: true,
    default: () => <div data-testid="mock-product-layout">ProductLayout</div>,
}));

describe('BodyLayout', () => {
    it('muestra el loader si loading es true', () => {
        render(<BodyLayout loading={true} error={null} product={null} seller={null} reviews={null} />);

        const skeleton = screen.getByText((content, element) =>
            element?.classList.contains('animate-pulse')
        );

        expect(skeleton).toBeInTheDocument();
    });

    it('muestra mensaje de error si hay error', () => {
        render(<BodyLayout loading={false} error="Error de carga" product={null} seller={null} reviews={null} />);

        expect(screen.getByText('Error de carga')).toBeInTheDocument();
    });

    it('renderiza ProductLayout si hay producto', () => {
        const mockProduct = { stock: 5, images: [], variants: [], seller: { name: 'MockSeller' }, payment: {} };
        const mockSeller = { name: 'Mock Seller' };
        const mockReviews = { rating: 4.5 };

        render(
            <BodyLayout
                loading={false}
                error={null}
                product={mockProduct}
                seller={mockSeller}
                reviews={mockReviews}
            />
        );

        expect(screen.getByTestId('mock-product-layout')).toBeInTheDocument();
    });
});
