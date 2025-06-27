import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loader from '../../../components/common/Loader';

describe('Loader', () => {
    it('renders without crashing', () => {
        render(<Loader />);
        const loaderElement = screen.getByTestId('loader');
        expect(loaderElement).toBeInTheDocument();
    });

    it('displays loading text', () => {
        render(<Loader />);
        const loadingText = screen.getByText(/cargando/i);
        expect(loadingText).toBeInTheDocument();
    });
}); 