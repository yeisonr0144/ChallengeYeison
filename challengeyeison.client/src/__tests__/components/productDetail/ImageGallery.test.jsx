import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ImageGallery from '../../../components/productDetail/ImageGallery';

describe('ImageGallery', () => {
    const mockImages = [
        'https://example.com/img1.jpg',
        'https://example.com/img2.jpg',
        'https://example.com/img3.jpg',
    ];

    beforeEach(() => {
        render(<ImageGallery images={mockImages} />);
    });

    it('renderiza todas las miniaturas', () => {
        const thumbnails = screen.getAllByRole('img');
        expect(thumbnails.length).toBe(mockImages.length + 1); // miniaturas + imagen principal
    });

    it('cambia la imagen principal al hacer click en una miniatura', () => {
        const thumbnails = screen.getAllByAltText(/Miniatura/i); // miniaturas solamente

        fireEvent.click(thumbnails[1]); // index 1 → mockImages[1]

        const mainImage = screen.getByAltText('Imagen principal del producto');
        expect(mainImage).toHaveAttribute('src', mockImages[1]);
    });

    it('muestra mensaje cuando no hay imágenes disponibles', () => {
        render(<ImageGallery images={[]} />);
        expect(screen.getByText('No hay imágenes disponibles')).toBeInTheDocument();
    });

    it('muestra la imagen al hacer hover sobre una miniatura', async () => {
        render(<ImageGallery images={mockImages} />);

        const secondThumbnail = screen.getAllByRole('img')[1];
        fireEvent.mouseEnter(secondThumbnail);

        await waitFor(() => {
            const mainImages = screen.getAllByAltText('Imagen principal del producto');
            expect(mainImages[0]).toHaveAttribute('src', mockImages[1]); // o el índice correcto según el orden
        });

        fireEvent.mouseLeave(secondThumbnail);

        await waitFor(() => {
            const mainImagesAfter = screen.getAllByAltText('Imagen principal del producto');
            expect(mainImagesAfter[0]).toHaveAttribute('src', mockImages[0]);
        });
    });
});
