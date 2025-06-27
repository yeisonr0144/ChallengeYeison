import { useState } from 'react';

export default function ImageGallery({ images = [] }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [hoveredImage, setHoveredImage] = useState(null);

    // Si no hay imágenes, mostrar placeholder
    if (!images || images.length === 0) {
        return (
            <div className="bg-white p-4">
                <p className="text-gray-600">No hay imágenes disponibles</p>
            </div>
        );
    }

    const currentImage = hoveredImage !== null ? hoveredImage : selectedImage;

    return (
        <div className="flex gap-4 bg-white p-4">
            {/* Grid de miniaturas */}
            <div className="flex flex-col gap-2 w-20">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`
                            relative cursor-pointer border-2 rounded overflow-hidden
                            ${(hoveredImage === index || selectedImage === index)
                                ? 'border-yellow-500'
                                : 'border-transparent'}
                        `}
                        onMouseEnter={() => setHoveredImage(index)}
                        onMouseLeave={() => setHoveredImage(null)}
                        onClick={() => setSelectedImage(index)}
                    >
                        <img
                            src={image}
                            alt={`Miniatura ${index + 1}`}
                            className="w-full h-full object-contain"
                        />
                    </div>
                ))}
            </div>

            {/* Imagen principal */}
            <div className="flex-1 flex items-center justify-center">
                <img
                    src={images[currentImage]}
                    alt="Imagen principal del producto"
                    className="max-w-full max-h-[500px] object-contain rounded"
                />
            </div>
        </div>
    );
}
