import ProductCard from '../components/ProductCard';
import { accesorios } from '../data/accesorios';

/**
 * Página del catálogo de accesorios
 */
const Accesorios = ({ onAgregarAlCarrito }) => {
    
    /**
     * Muestra toast al agregar producto
     */
    const handleAgregar = (producto) => {
        onAgregarAlCarrito(producto);
        
        // Mostrar toast
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
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Accesorios;