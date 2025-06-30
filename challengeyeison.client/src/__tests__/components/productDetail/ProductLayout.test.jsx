import { render, screen } from "@testing-library/react";
import ProductLayout from "../../../components/productDetail/ProductLayout";
import React from "react";
import { FavoritesProvider } from "../../../context/FavoritesContext";
import { CartProvider } from "../../../context/CartContext";

describe("ProductLayout", () => {
    const mockProduct = {
        price: 129000,
        variants: [
            { type: "color", value: "rojo", images: ["img1.jpg", "img2.jpg"] }
        ],
        images: ["default1.jpg"],
        stock: 5,
        seller: { name: "Vendedor Interno" },
        payment: { method: "visa" }
    };

    const mockSeller = {
        name: "Vendedor Externo",
        metrics: {
            completedSales: 123,
            badges: [
                { type: "good_service", text: "Buena atención" },
                { type: "fast_delivery", text: "Entrega rápida" }
            ]
        }
    };

    const mockReviews = {
        rating: 4.5,
        comments: [],
        reviews: [],
        ratingDetails: [
            { rating: 5, percentage: 80 },
            { rating: 4, percentage: 15 },
            { rating: 3, percentage: 5 }
        ],
        characteristics: [
            { name: "Calidad", value: 4 },
            { name: "Durabilidad", value: 5 }
        ]
    };

    it("renderiza sin errores con datos válidos", () => {
        render(
            <CartProvider>
                <FavoritesProvider>
                    <ProductLayout product={mockProduct} seller={mockSeller} reviews={mockReviews} />
                </FavoritesProvider>
            </CartProvider>
        );

        expect(screen.getByText(/ㅤㅤㅤ/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Vendedor Externo/i).length).toBeGreaterThan(0);
        expect(screen.getByText(/\$ 129.000/)).toBeInTheDocument(); // 💸
    });

    it("renderiza correctamente sin variantes de color", () => {
        const productSinVariantes = { ...mockProduct, variants: [] };

        render(
            <CartProvider>
                <FavoritesProvider>
                    <ProductLayout product={productSinVariantes} seller={mockSeller} reviews={mockReviews} />
                </FavoritesProvider>
            </CartProvider>
        );

        expect(
            screen.getByText((content) => content.includes("ㅤㅤㅤ"))
        ).toBeInTheDocument();
    });

    it("renderiza correctamente si la variante de color no tiene imágenes", () => {
        const productSinImagenesEnVariante = {
            ...mockProduct,
            variants: [{ type: "color", value: "azul" }] // sin imágenes
        };

        render(
            <CartProvider>
                <FavoritesProvider>
                    <ProductLayout product={productSinImagenesEnVariante} seller={mockSeller} reviews={mockReviews} />
                </FavoritesProvider>
            </CartProvider>
        );

        expect(screen.getByText(/ㅤㅤㅤ/i)).toBeInTheDocument();
    });

    it("usa product.seller si no se pasa seller por props", () => {
        const productConSeller = {
            ...mockProduct,
            seller: { name: "Fallback Seller" }
        };

        render(
            <CartProvider>
                <FavoritesProvider>
                    <ProductLayout product={productConSeller} reviews={mockReviews} />
                </FavoritesProvider>
            </CartProvider>
        );

        expect(screen.getAllByText(/Fallback Seller/i).length).toBeGreaterThan(0);
    });
});
