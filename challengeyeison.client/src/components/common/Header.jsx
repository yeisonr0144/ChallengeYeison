import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/meli.css";

export default function Header() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__left">
                    <img
                        src="/MeliLogo.svg"
                        alt="Logo Mercado Libre"
                        className="header__logo"
                    />
                </div>

                <div className="header__center">
                    <div className="header__search-wrapper">
                        <input
                            type="text"
                            className="header__search"
                            placeholder="Buscar productos, marcas y más…"
                        />
                        <span className="header__search-icon">🔍</span>
                    </div>

                    {!isMobile && (
                        <div className="header__under-search-links">
                            <Link to="#">Categorías</Link>
                            <Link to="#">Ofertas</Link>
                            <Link to="#">Cupones</Link>
                            <Link to="#">Supermercado</Link>
                            <Link to="#">Moda</Link>
                            <Link to="#">Vender</Link>
                            <Link to="#">Ayuda / PQR</Link>
                        </div>
                    )}
                </div>

                {!isMobile && (
                    <div className="header__right">
                        <img
                            src="https://http2.mlstatic.com/D_NQ_614112-MLA83386949070_042025-OO.webp"
                            alt="Banner derecho"
                            className="header__banner"
                        />
                        <div className="header__right-buttons">
                            <Link to="#" className="header__mobile-link">Crea tu cuenta</Link>
                            <Link to="#" className="header__mobile-link">Ingresa</Link>
                            <Link to="#" className="header__mobile-link">Mis compras</Link>
                            <Link to="#" className="header__mobile-link">
                                <i className="header__cart-icon">🛒</i>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {isMobile && (
                <div className="header__mobile-menu">
                    <Link to="#" className="header__mobile-link">Crea tu cuenta</Link>
                    <Link to="#" className="header__mobile-link">Ingresa</Link>
                    <Link to="#" className="header__mobile-link">Mis compras</Link>
                    <Link to="#" className="header__mobile-link">
                        <i className="header__cart-icon">🛒</i>
                    </Link>
                </div>
            )}
        </header>
    );
}
