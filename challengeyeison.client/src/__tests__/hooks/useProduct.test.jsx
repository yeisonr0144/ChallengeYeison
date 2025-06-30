import { renderHook, waitFor } from '@testing-library/react';
import { useProduct } from '../../hooks/useProduct';
import * as api from '../../api/axiosInstance';
import { vi } from 'vitest';

describe('useProduct', () => {
    const productId = 'prod123';

    const mockProduct = {
        id: productId,
        title: 'Producto de prueba',
        seller: { id: 'seller1', name: 'Vendedor' },
        variants: [],
        images: [],
        stock: 10,
        payment: {}
    };

    const mockSeller = {
        id: 'seller1',
        name: 'Vendedor'
    };

    const mockReviews = {
        rating: 4.5,
        ratingDetails: {},
        characteristics: [],
        reviews: []
    };

    beforeEach(() => {
        vi.spyOn(api, 'getProductById').mockResolvedValue(mockProduct);
        vi.spyOn(api, 'getSellerById').mockResolvedValue(mockSeller);
        vi.spyOn(api, 'getReviewsByProductId').mockResolvedValue(mockReviews);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('debe retornar producto, vendedor y reseñas correctamente', async () => {
        const { result } = renderHook(() => useProduct(productId));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        }, { timeout: 2000 });

        expect(result.current.product).toEqual(mockProduct);
        expect(result.current.seller).toEqual(mockSeller);
        expect(result.current.reviews).toEqual(mockReviews);
        expect(result.current.error).toBe(null);
    });

    it('debe manejar error si el ID es inválido', async () => {
        const { result } = renderHook(() => useProduct(null));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.error).toBe('ID de producto no válido');
        expect(result.current.product).toBe(null);
    });

    it('debe manejar error de producto no encontrado', async () => {
        vi.spyOn(api, 'getProductById').mockRejectedValueOnce(new Error('No encontrado'));

        const { result } = renderHook(() => useProduct('fakeId'));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.product).toBe(null);
        expect(result.current.error).toBe('Error al cargar producto');
    });
});
