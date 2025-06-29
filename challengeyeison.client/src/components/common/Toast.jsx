import React, { useEffect } from 'react';

export default function Toast({ message, onClose, type = 'success' }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColor = type === 'success' ? 'bg-[#4A9058]' : 'bg-[#333333]';

    return (
        <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-2 min-w-[300px]`}>
            <span className="text-sm">{message}</span>
        </div>
    );
} 