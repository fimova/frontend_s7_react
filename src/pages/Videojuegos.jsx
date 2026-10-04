import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { videojuegos } from '../data/videojuegos';

/**
 * Página del catálogo de videojuegos
 * Incluye buscador, filtro de productos y gestión del carrito
 */
const Videojuegos = ({ onAgregarAlCarrito, carrito }) => {
    
    const [busqueda, setBusqueda] = useState('');
    const [mensaje, setMensaje] = useState('');

    /**
     * Maneja el cambio en el input de búsqueda
     */
    const handleBusquedaChange = (e) => {
        const valor = e.target.value;
        setBusqueda(valor);
        
        if (valor.trim() === '') {
            setMensaje('');
        }
    };

    /**
     * Maneja el envío del formulario de búsqueda
     */
    const handleBusquedaSubmit = (e) => {
        e.preventDefault();
        
        if (busqueda.trim() === '') {
            setMensaje('Por favor, ingresa un término de búsqueda.');
            return;
        }

        const resultados = productosFiltrados.length;
        
        if (resultados === 0) {
            setMensaje(`No se encontraron productos con "${busqueda}".`);
        } else {
            setMensaje(`Se encontraron ${resultados} producto(s) con "${busqueda}".`);
        }
    };

    /**
     * Filtra productos según el término de búsqueda
     */
    const productosFiltrados = videojuegos.filter(producto =>
        producto.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );

    /**
     * Verifica si un producto ya está en el carrito
     */
    const estaEnCarrito = (productoId) => {
        return carrito.some(item => item.id === productoId);
    };

    /**
     * Agrega un producto al carrito y muestra un toast
     */
    const handleAgregar = (producto) => {
        onAgregarAlCarrito(producto);
        
        // Mostrar toast usando Bootstrap
        const toastElement = document.getElementById('toastCarrito');
        const toastBody = toastElement.querySelector('.toast-body');
        toastBody.textContent = `"${producto.titulo}" agregado al carrito`;
        toastElement.className = 'toast align-items-center text-bg-success border-0';
        
        const toast = new window.bootstrap.Toast(toastElement);
        toast.show();
    };

    return (
        <main>
            <section className="catalogo">
                <h2>Catálogo Videojuegos</h2>

                {/* Formulario de búsqueda */}
                <div className="container mb-4">
                    <form onSubmit={handleBusquedaSubmit} className="d-flex" role="search">
                        <input 
                            type="search"
                            className="form-control me-2"
                            placeholder="Buscar videojuego por nombre..."
                            value={busqueda}
                            onChange={handleBusquedaChange}
                        />
                        <button type="submit" className="btn boton-producto">
                            Buscar
                        </button>
                    </form>
                    
                    {/* Mensaje de resultados de búsqueda */}
                    {mensaje && (
                        <p className={`mt-2 ${productosFiltrados.length === 0 ? 'text-warning' : 'text-success'}`}>
                            {mensaje}
                        </p>
                    )}
                </div>

                {/* Listado de productos */}
                <div className="container">
                    <div className="row g-4">
                        {productosFiltrados.length > 0 ? (
                            productosFiltrados.map(producto => (
                                <ProductCard 
                                    key={producto.id}
                                    producto={producto}
                                    onAgregar={handleAgregar}
                                    productoEnCarrito={estaEnCarrito(producto.id)}
                                />
                            ))
                        ) : busqueda.trim() !== '' && (
                            <div className="col-12 text-center">
                                <p className="text-muted">No se encontraron productos.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Videojuegos;