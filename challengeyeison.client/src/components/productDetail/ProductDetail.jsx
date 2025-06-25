import ImageGallery from "./ImageGallery";
import PriceInfo from "./PriceInfo";
import SellerInfo from "./SellerInfo";
import PaymentOptions from "./PaymentOptions";

//export default function ProductDetail({ product }) {
export default function ProductDetail() {

    const productoMock = {
        title: "Camiseta Inter Miami 2024",
        price: 150000,
        stock: 12,
        images: [
            "https://cdn.pixabay.com/photo/2024/06/28/14/22/jesus-8859597_1280.jpg",
            "https://image.cdn2.seaart.ai/2023-10-17/20128067336829957/89f883840c5afec99aa18ce48c5fb82e82a68803_low.webp"
        ],
        payment: [
            { method: "Tarjeta de crédito", installments: 6, amount: 25000 }
        ],
        seller: {
            name: "Tienda Oficial",
            location: "Medellín",
            reputation: "Muy buena"
        }
    };


    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageGallery images={productoMock.images} />
                <div>
                    <PriceInfo
                        title={productoMock.title}
                        price={productoMock.price}
                        stock={productoMock.stock}
                    />
                    <PaymentOptions options={productoMock.payment} />
                    <SellerInfo seller={productoMock.seller} />
                </div>
            </div>
        </div>
    );
}