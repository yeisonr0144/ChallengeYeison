import React from 'react';
import PropTypes from 'prop-types';
import Loader from './Loader';

const BodyLayout = ({ children, isLoading, error }) => {
    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Oops! Algo salió mal
                    </h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="w-full">
                {children}
            </div>
        </div>
    );
};

BodyLayout.propTypes = {
    children: PropTypes.node.isRequired,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
};

export default BodyLayout;