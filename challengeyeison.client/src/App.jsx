import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ProductPage from './pages/ProductPage';
import './App.css';

export default function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-100">
                <Header />
                <Routes>
                    {/* Redirigir la ruta raíz a un producto por defecto */}
                    <Route path="/" element={<Navigate to="/producto/MLA12345" replace />} />
                    <Route path="/producto/:id" element={<ProductPage />} />
                    {/* Ruta de fallback para IDs no válidos */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}
