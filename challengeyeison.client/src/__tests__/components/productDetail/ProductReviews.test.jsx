import { render, screen, fireEvent } from "@testing-library/react";
import ProductReviews from "../../../components/productDetail/ProductReviews";

const mockReviews = {
    rating: {
        average: 4.5,
        totalReviews: 10,
    },
    ratingDetails: [
        { stars: 5, count: 5, percentage: 50 },
        { stars: 4, count: 3, percentage: 30 },
        { stars: 3, count: 1, percentage: 10 },
        { stars: 2, count: 1, percentage: 10 },
        { stars: 1, count: 0, percentage: 0 },
    ],
    reviews: [
        {
            id: "1",
            rating: 5,
            text: "Excelente producto",
            date: "2024-01-01",
            userName: "Juan",
            votes: 3,
        },
        {
            id: "2",
            rating: 4,
            text: "Muy buen producto",
            date: "2024-01-02",
            userName: "María",
            votes: 2,
        },
        {
            id: "3",
            rating: 3,
            text: "Regular producto",
            date: "2024-01-03",
            userName: "Carlos",
            votes: 1,
        },
        {
            id: "4",
            rating: 2,
            text: "Mala experiencia",
            date: "2024-01-04",
            userName: "Luisa",
            votes: 0,
        },
    ],
    characteristics: [
        { name: "Calidad", stars: 4 },
        { name: "Durabilidad", stars: 4 },
    ],
};

describe("ProductReviews Component", () => {
    test("renders average rating", () => {
        render(<ProductReviews reviews={mockReviews} />);
        expect(screen.getByText("4.5")).toBeInTheDocument();
        expect(screen.getByText(/10 calificaciones/i)).toBeInTheDocument();
    });

    test("renders first 3 reviews only by default", () => {
        render(<ProductReviews reviews={mockReviews} />);
        expect(screen.getByText("Excelente producto")).toBeInTheDocument();
        expect(screen.getByText("Muy buen producto")).toBeInTheDocument();
        expect(screen.getByText("Regular producto")).toBeInTheDocument();
        // No debería estar visible inicialmente
        expect(screen.queryByText("Mala experiencia")).not.toBeInTheDocument();
    });

    test("shows all reviews when 'Mostrar todas las opiniones' is clicked", () => {
        render(<ProductReviews reviews={mockReviews} />);

        // El botón debe estar visible
        const toggleButton = screen.getByRole("button", {
            name: /mostrar todas las opiniones/i,
        });
        expect(toggleButton).toBeInTheDocument();

        // Clic para mostrar todas
        fireEvent.click(toggleButton);

        // Ahora debe aparecer la 4ta reseña
        expect(screen.getByText("Mala experiencia")).toBeInTheDocument();

        // El botón cambia a "Mostrar menos opiniones"
        expect(
            screen.getByRole("button", { name: /mostrar menos opiniones/i })
        ).toBeInTheDocument();
    });
});
