import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import BodyLayout from "./components/common/BodyLayout";
//import ProductPage from "./pages/ProductPage";
import ProductDetail from "./components/productDetail/ProductDetail";

export default function App() {
    return (
        <Router>
            <Header />
            <BodyLayout />
            <Routes>
                {/* Ruta principal que recibe un id dinámico del producto */}
                <Route path="/product/:id" element={<ProductDetail />} />

                {/* Puedes dejar esta ruta si planeas una homepage o listado general */}
                {/*<Route path="/" element={<h2 className="p-6">Bienvenido a la tienda</h2>} />*/}
            </Routes>
        </Router>
    );
}
