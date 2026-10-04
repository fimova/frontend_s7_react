import ProductCard from '../components/ProductCard';
import { accesorios } from '../data/accesorios';

/**
 * Página del catálogo de accesorios
 * Muestra productos y permite agregarlos al carrito
 */
const Accesorios = ({ onAgregarAlCarrito, carrito }) => {
    
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
            {/* Catálogo de accesorios */}
            <section className="catalogo">
                <h2>Catálogo Accesorios</h2>
                
                {/* Grid de productos */}
                <div className="container">
                    <div className="row g-4">
                        {accesorios.map(producto => (
                            <ProductCard 
                                key={producto.id}
                                producto={producto}
                                onAgregar={handleAgregar}
                                productoEnCarrito={estaEnCarrito(producto.id)}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Accesorios;