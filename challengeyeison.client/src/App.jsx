import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./components/productDetail/ProductDetail";

export default function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<ProductDetail />} />

                {/*<Route path="/product/:id" element={<ProductPage />} />*/}
            </Routes>
        </Router>
    );
}
