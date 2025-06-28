import React, { useState, useRef, useEffect } from "react";

export default function Footer() {
    const [showMore, setShowMore] = useState(false);
    const moreInfoRef = useRef(null);
    const [height, setHeight] = useState("0px");

    useEffect(() => {
        if (moreInfoRef.current) {
            if (showMore) {
                setHeight(`${moreInfoRef.current.scrollHeight}px`);
            } else {
                setHeight("0px");
            }
        }
    }, [showMore]);
    const columns = [
        {
            title: "Acerca de",
            links: ["Mercado Libre", "Investor relations", "Tendencias", "Sustentabilidad", "Blog"],
        },
        {
            title: "Otros sitios",
            links: ["Developers", "Mercado Pago", "Envíos", "Mercado Shops", "Mercado Ads"],
        },
        {
            title: "Ayuda / PQR",
            links: ["Comprar", "Vender", "Resolución de problemas", "Centro de seguridad"],
        },
        {
            title: "Redes sociales",
            links: ["X", "Facebook", "YouTube"],
        },
        {
            title: "Mi cuenta",
            links: ["Ingresa", "Vender"],
        },
        {
            title: "Mercado Puntos",
            links: ["Nivel 6", "Disney+", "Max", "Paramount+", "ViX Premium"],
        },
        {
            title: "Temporadas",
            links: ["Black Friday", "Hot Sale", "Descuentazos"],
        },
    ];

    return (
        <>
            {/* BLOQUE 1 - Productos más buscados */}
            <div className="w-full bg-[#ededed] text-sm text-gray-700 px-4 pt-8 pb-6">
                <div className="max-w-[1150px] mx-auto">

                    {/* Título */}
                    <h3 className="text-lg font-medium mb-2 text-left">
                        Productos más buscados
                    </h3>

                    {/* Texto con 95% de ancho, justificado */}
                    <div className="w-[98%]">
                        <p className="text-sm text-gray-600 mb-6 leading-relaxed text-justify">
                            Air Fryer - Aire Acondicionado - Aire Acondicionado Portátil - Airpods - Alexa - Apple Tv - Apple Watch - Audífonos - Audífonos Inalámbricos - Escritorio - Gps - Honor - Huawei - Ipad - Iphone X - Iphone 11 Pro - Iphone 12 - Iphone 12 Pro - Iphone 12 Pro Max - Iphone 13 Pro - Iphone 16 - Iphone 16 Plus - Iphone 16 Pro Max - Jbl - Lavadora - Lenovo - Motorola - Nevera - Nintendo - Nintendo Switch - Oppo Reno 7 - Playstation 5 - Redmi - Redmi 12 - Redmi Note 11 - Reloj Inteligente - Roku - S23 Ultra - Samsung - Samsung A32 - Samsung A54 - Samsung S21 - Samsung S24 Ultra - Silla Gamer - Smartwatch - Tablet - Teclado - Ventiladores - Webcam - Xbox - Xbox Series S - Xbox Series X - Xiaomi
                        </p>
                    </div>

                    {/* Sección de letras, centrada y más angosta */}
                    <div className="mb-4 max-w-[68%] mx-auto">
                        <p className="text-sm font-medium mb-2 text-left">
                            Busca productos por letra inicial
                        </p>
                        <div className="flex flex-wrap justify-center gap-0 text-sm text-gray-700 ">
                            {"A-B-C-D-E-F-G-H-I-J-K-L-M-N-O-P-Q-R-S-T-U-V-W-X-Y-Z"
                                .split("")
                                .map((letter) => (
                                    <span
                                        key={letter}
                                        className="cursor-pointer hover:underline px-1">
                                        {letter}
                                    </span>
                                ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenedor fondo gris claro, sin padding, sin bordes */}
            <div className="w-full bg-[#ededed] flex justify-center">

                {/* Botón visualmente unido al footer */}
                <button
                    onClick={() => setShowMore(!showMore)}
                    className="px-4 py-2 bg-white text-sm border-x border-t border-gray-300 rounded-t-md shadow-sm hover:bg-gray-100 transition-all"
                >
                    {showMore ? "Menos información ▼" : "Más información ▲"}
                </button>
            </div>

            {/* Footer blanco */}
            <footer className="text-sm text-gray-700 bg-white w-full">
                <div
                    ref={moreInfoRef}
                    style={{
                        height: height,
                        overflow: "hidden",
                        transition: "height 0.3s ease"
                    }}>
                    {/* Columnas expandibles (solo si showMore es true) */}
                    {showMore && (
                        <div className="border-t border-gray-200">
                            <div className="max-w-[1095px] mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 text-left">
                                {columns.map((col, idx) => (
                                    <div key={idx}>
                                        <h4 className="text-gray-900 font-semibold mb-2">{col.title}</h4>
                                        <ul className="space-y-1">
                                            {col.links.map((link, i) => (
                                                <li key={i}>
                                                    <a href="#" className="hover:underline text-gray-600">
                                                        {link}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sección inferior siempre visible */}
                <div className="py-6 px-4 text-xs text-gray-700 w-full">
                    <div className="max-w-[800px] mx-auto text-left">
                        {/* Enlaces legales en una sola línea */}
                        <div className="flex flex-wrap justify-start gap-x-1 mb-3">
                            <a href="#" className="hover:underline">Trabaja con nosotros</a>
                            <span className="text-gray-400">|</span>
                            <a href="#" className="hover:underline">Términos y condiciones</a>
                            <span className="text-gray-400">|</span>
                            <a href="#" className="hover:underline">Promociones</a>
                            <span className="text-gray-400">|</span>
                            <a href="#" className="hover:underline">Cómo cuidamos tu privacidad</a>
                            <span className="text-gray-400">|</span>
                            <a href="#" className="hover:underline">Accesibilidad</a>
                            <span className="text-gray-400">|</span>
                            <a href="#" className="hover:underline">Ayuda / PQR</a>
                            <span className="text-gray-400">|</span>
                            <a href="#" className="hover:underline">Navidad</a>
                            <span className="text-gray-400">|</span>
                            <a href="#" className="hover:underline">www.sic.gov.co</a>
                        </div>

                        {/* Derechos de autor */}
                        <p className="text-gray-600 mb-3 leading-relaxed">
                            Copyright © 1999-2025 MercadoLibre Colombia LTDA.
                            <br />
                            <span className="text-gray-600">
                                Calle 100 #7-33, Torre I, Piso 16, Bogotá D.C., Colombia
                            </span>
                        </p>
                    </div>

                    {/* Línea divisoria sutil */}
                    <div className="w-[370px] mx-auto border-t border-gray-200 my-4"></div>

                    {/* Logos oficiales centrados y más grandes */}
                    <div className="flex justify-center items-center gap-6">
                        <img
                            src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadolibre/sic.png"
                            alt="Logo SIC"
                            className="h-8 object-contain"
                        />
                        <img
                            src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadolibre/pum.png"
                            alt="Logo PUM"
                            className="h-8 object-contain"
                        />
                    </div>
                </div>


            </footer>
        </>
    );
}
