import React, { createContext, useContext, useState } from 'react';
import Toast from '../components/common/Toast';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
    const [toast, setToast] = useState(null);

    const showToast = (message, type) => {
        setToast({ message, type });
    };

    const hideToast = () => {
        setToast(null);
    };

    const toggleFavorite = (productId) => {
        setFavorites(prev => {
            const isFavorite = prev.includes(productId);
            const newFavorites = isFavorite
                ? prev.filter(id => id !== productId)
                : [...prev, productId];
            
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            
            showToast(
                isFavorite 
                    ? "Eliminaste el producto de Mis favoritos."
                    : "Se agregó a Mis favoritos.",
                isFavorite ? 'error' : 'success'
            );
            
            return newFavorites;
        });
    };

    const isFavorite = (productId) => {
        return favorites.includes(productId);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={hideToast}
                />
            )}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites debe ser usado dentro de un FavoritesProvider');
    }
    return context;
} 