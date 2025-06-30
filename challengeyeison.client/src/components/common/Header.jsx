import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    MapPinIcon,
    ShoppingCartIcon,
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import MeliLogo from "../../assets/MeliLogo.svg";
import "../../styles/meli.css";

export default function Header() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setShowMobileMenu(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <header className="header">
            <div className="header__container-wrapper">
                <div className="header__container">
                    {/* Fila superior */}
                    <div className="header__top">
                        {/* Columna 1: Logo */}
                        <div>
                            <img
                                src={MeliLogo}
                                alt="Logo Mercado Libre"
                                className="header__logo"
                            />
                        </div>

                        {/* Columna 2: Buscador */}
                        {!isMobile && (
                            <div>
                                <div className="header__search-wrapper">
                                    <input
                                        type="text"
                                        className="header__search"
                                        placeholder="Buscar productos, marcas y más…"
                                    />
                                    <span className="header__search-icon">🔍</span>
                                </div>
                            </div>
                        )}

                        {/* Columna 3: Imagen/banner o botón menú */}
                        <div>
                            {isMobile ? (
                                <button
                                    className="header__menu-button"
                                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                                >
                                    {showMobileMenu ? (
                                        <XMarkIcon className="w-6 h-6 text-gray-700" />
                                    ) : (
                                        <Bars3Icon className="w-6 h-6 text-gray-700" />
                                    )}
                                </button>
                            ) : (
                                <img
                                    src="https://http2.mlstatic.com/D_NQ_614112-MLA83386949070_042025-OO.webp"
                                    alt="Banner derecho"
                                    className="header__banner"
                                />
                            )}
                        </div>
                    </div>

                    {/* Separador vertical entre filas */}
                    {!isMobile && <div className="header__spacer"></div>}

                    {/* Fila inferior */}
                    {!isMobile && (
                        <div className="header__bottom">
                            {/* Columna 1: Ubicación */}
                            <div className="header__location">
                                <MapPinIcon className="w-4 h-4 text-gray-700" />
                                <div className="leading-tight">
                                    <div className="text-[11px] text-gray-600">Ingresa tu</div>
                                    <div className="text-[12px] font-semibold text-gray-800">
                                        ubicación
                                    </div>
                                </div>
                            </div>

                            {/* Columna 2: Enlaces */}
                            <div className="header__under-search-links">
                                <Link to="#">Categorías</Link>
                                <Link to="#">Ofertas</Link>
                                <Link to="#">Cupones</Link>
                                <Link to="#">Supermercado</Link>
                                <Link to="#">Moda</Link>
                                <Link to="#">Vender</Link>
                                <Link to="#">Ayuda / PQR</Link>
                            </div>

                            {/* Columna 3: Botones usuario */}
                            <div className="header__right-buttons">
                                <Link to="#">Crea tu cuenta</Link>
                                <Link to="#">Ingresa</Link>
                                <Link to="#">Mis compras</Link>
                                <Link to="#">
                                    <ShoppingCartIcon className="header__cart-icon w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Menú móvil */}
            {isMobile && showMobileMenu && (
                <div className="header__mobile-menu">
                    <Link to="#">Crea tu cuenta</Link>
                    <Link to="#">Ingresa</Link>
                    <Link to="#">Mis compras</Link>
                    <Link to="#">
                        <ShoppingCartIcon className="header__cart-icon w-5 h-5" />
                    </Link>
                    <Link to="#">Categorías</Link>
                    <Link to="#">Ofertas</Link>
                    <Link to="#">Cupones</Link>
                    <Link to="#">Supermercado</Link>
                    <Link to="#">Moda</Link>
                    <Link to="#">Vender</Link>
                    <Link to="#">Ayuda / PQR</Link>
                </div>
            )}
        </header>
    );
}
