import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

// Mock de axios antes de importar el hook
vi.mock('../../api/axiosInstance', () => {
  const getMock = vi.fn();
  const axiosFn = () => ({});
  axiosFn.get = getMock;
  return {
    __esModule: true,
    default: axiosFn,
    getProductById: getMock,
    getSellerById: getMock,
    getReviewsByProductId: getMock,
  };
});

import { useProduct } from '../../hooks/useProduct';
import { getProductById, getSellerById, getReviewsByProductId } from '../../api/axiosInstance';

const mockProduct = {
  id: '123',
  title: 'iPhone 14',
  price: 999.99,
  stock: 5
};

beforeEach(() => {
  vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  vi.clearAllMocks();
});

describe('useProduct Hook', () => {
  test('returns loading state initially', () => {
    const { result } = renderHook(() => useProduct('123'));
    expect(result.current.loading).toBe(true);
  });

  test('returns product data after successful fetch', async () => {
    // Mock de la respuesta de la API
    getProductById.mockResolvedValueOnce(mockProduct);
    getReviewsByProductId.mockResolvedValueOnce({ rating: { average: 4, totalReviews: 0 }, reviews: [], ratingDetails: [], characteristics: [] });
    getSellerById.mockResolvedValueOnce({ id: 'seller1', name: 'Seller 1' });

    const { result } = renderHook(() => useProduct('123'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.product).toEqual(mockProduct);
      expect(result.current.error).toBe(null);
    }, { timeout: 2000 });
  });

  test('returns error on failed fetch', async () => {
    const errorMessage = 'Error al cargar producto';
    // Mock de error de la API con formato de respuesta de axios
    getProductById.mockRejectedValueOnce({
      response: {
        data: {
          message: errorMessage
        }
      }
    });

    const { result } = renderHook(() => useProduct('123'));

    // Primero esperamos a que el error se establezca
    await waitFor(() => {
      expect(result.current.error).toBe(errorMessage);
      expect(result.current.product).toBe(null);
    }, { timeout: 2000 });

    // Luego verificamos que loading sea false
    expect(result.current.loading).toBe(false);
  });
}); 