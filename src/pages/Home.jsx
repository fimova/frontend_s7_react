import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * Página de inicio con carousel y mensaje de bienvenida
 */
const Home = () => {
    
    // Estado para mostrar/ocultar información de métodos de pago
    const [mostrarPago, setMostrarPago] = useState(true);

    /**
     * Alterna la visibilidad de la información de pago
     */
    const togglePago = () => {
        setMostrarPago(!mostrarPago);
    };

    // Inicializar carrusel de Bootstrap
    useEffect(() => {
        const carouselElement = document.getElementById('carouselMibu');
        if (carouselElement) {
            new window.bootstrap.Carousel(carouselElement, {
                interval: 3000,
                ride: 'carousel'
            });
        }
    }, []); // indica que solo se ejecuta al montar el componente

    return (
        <main>
            {/* Sección de bienvenida */}
            <section className="bienvenida">
                <h2>¡Tu próximo juego favorito podría estar aquí!</h2>
                <p>Con opciones para todos los gustos</p>
                
                {/* Renderizado condicional de la nota de pago */}
                {mostrarPago && (
                    <p className="nota-pago">
                        <em>Métodos de pago aceptados: efectivo, transferencia y tarjetas de crédito y débito</em>
                    </p>
                )}
                
                <button 
                    type="button"
                    className="btn boton-producto"
                    onClick={togglePago}
                >
                    {mostrarPago ? 'Ocultar información' : 'Mostrar información sobre métodos de pago'}
                </button>
            </section>

            {/* Sección de productos destacados */}
            <section className="destacados">
                <h2>Productos destacados</h2>

                {/* Carousel de Bootstrap */}
                <div className="container px-3 px-md-4 px-xl-5">
                    <div 
                        id="carouselMibu"
                        className="carousel slide"
                    >
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img 
                                    src="img/rotr.jpg"
                                    className="d-block w-100"
                                    alt="Rise of the Ronin"
                                />
                            </div>

                            <div className="carousel-item">
                                <img 
                                    src="img/tkrbwarriors.jpg"
                                    className="d-block w-100"
                                    alt="Touken Ranbu Warriors"
                                />
                            </div>

                            <div className="carousel-item">
                                <img 
                                    src="img/meikoi.jpg"
                                    className="d-block w-100"
                                    alt="Meiji Tokyo Renka"
                                />
                            </div>

                            <div className="carousel-item">
                                <img 
                                    src="img/wwht.jpg"
                                    className="d-block w-100"
                                    alt="We were here together"
                                />
                            </div>
                        </div>

                        <button 
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselMibu"
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Anterior</span>
                        </button>

                        <button 
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselMibu"
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Siguiente</span>
                        </button>
                    </div>
                </div>

                <p>Revisa algunos de nuestros productos <strong>más vendidos</strong>.</p>
                <Link to="/videojuegos">Ver ofertas</Link>
            </section>
        </main>
    );
};

export default Home;