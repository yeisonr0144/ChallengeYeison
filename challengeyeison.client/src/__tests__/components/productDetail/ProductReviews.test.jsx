import { render, screen } from '@testing-library/react';
import ProductReviews from '../../../components/productDetail/ProductReviews';

const mockReviews = {
  rating: {
    average: 4.5,
    totalReviews: 10
  },
  ratingDetails: [
    { stars: 5, count: 5, percentage: 50 },
    { stars: 4, count: 3, percentage: 30 },
    { stars: 3, count: 1, percentage: 10 },
    { stars: 2, count: 1, percentage: 10 },
    { stars: 1, count: 0, percentage: 0 }
  ],
  reviews: [
    {
      id: '1',
      rating: 5,
      text: 'Excelente producto',
      date: '2024-01-01',
      userName: 'Juan'
    },
    {
      id: '2',
      rating: 4,
      text: 'Muy buen producto',
      date: '2024-01-02',
      userName: 'María'
    }
  ],
  characteristics: [
    { name: 'Calidad', average: 4.5 },
    { name: 'Durabilidad', average: 4.2 }
  ],
};

describe('ProductReviews Component', () => {
  test('renders average rating', () => {
    render(<ProductReviews reviews={mockReviews} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText(/10\s+calificaciones/i)).toBeInTheDocument();
  });

  test('renders review list', () => {
    render(<ProductReviews reviews={mockReviews} />);
    expect(screen.getByText(/Excelente producto/i)).toBeInTheDocument();
    expect(screen.getByText(/Muy buen producto/i)).toBeInTheDocument();
  });

  test('shows user names', () => {
    render(<ProductReviews reviews={mockReviews} />);
    expect(screen.getByText(/comentarios/i)).toBeInTheDocument();
  });
}); 