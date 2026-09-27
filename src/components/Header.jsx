import { Link } from 'react-router-dom';

/**
 * Encabezado principal con navegación
 * Recibe la ruta actual para marcar el link activo
 */
const Header = ({ rutaActual }) => {
    
    return (
        <header>
            <div className="encabezado">
                <h1>Videojuegos Mibu</h1>
                <p>Descubre nuestra selección de videojuegos para distintas plataformas</p>
            </div>

            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    
                    {/* Botón hamburguesa para móviles */}
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarMibu"
                        aria-controls="navbarMibu" 
                        aria-expanded="false" 
                        aria-label="Abrir menú de navegación"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Enlaces de navegación */}
                    <div className="collapse navbar-collapse justify-content-center" id="navbarMibu">
                        <div className="navbar-nav">
                            <Link 
                                className={`nav-link ${rutaActual === '/' ? 'active' : ''}`}
                                to="/"
                            >
                                Inicio
                            </Link>
                            <Link 
                                className={`nav-link ${rutaActual === '/videojuegos' ? 'active' : ''}`}
                                to="/videojuegos"
                            >
                                Videojuegos
                            </Link>
                            <Link 
                                className={`nav-link ${rutaActual === '/accesorios' ? 'active' : ''}`}
                                to="/accesorios"
                            >
                                Accesorios
                            </Link>
                            <Link 
                                className={`nav-link ${rutaActual === '/contacto' ? 'active' : ''}`}
                                to="/contacto"
                            >
                                Contacto
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;