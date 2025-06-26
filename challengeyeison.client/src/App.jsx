import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./components/common/Header";
import BodyLayout from "./components/common/BodyLayout";
import ProductPage from './pages/ProductPage';
import './App.css';

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <BodyLayout />
            <Routes>
                {/* Redirigir la ruta raíz a un producto por defecto */}
                <Route path="/" element={<Navigate to="/producto/MLB3025054960" replace />} />
                <Route path="/producto/:id" element={<ProductPage />} />
                {/* Ruta de fallback para IDs no válidos */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
