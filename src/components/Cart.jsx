import { useEffect } from 'react';
import CartItem from './CartItem';
import CartEmpty from './CartEmpty';

/**
 * Carrito lateral (offcanvas)
 * Dividido en componentes reutilizables para mayor claridad
 */
const Cart = ({ 
    carrito, 
    onEliminar, 
    onDisminuir, 
    onAgregar, 
    onVaciar, 
    total 
}) => {

    /**
     * Inicializar Bootstrap Toast
     */
    useEffect(() => {
        const toastElList = document.querySelectorAll('.toast');
        toastElList.forEach(toastEl => {
            new window.bootstrap.Toast(toastEl);
        });
    }, []);

    /**
     * Muestra un toast 
     */
    const mostrarToast = (texto, tipo) => {
        const toastElement = document.getElementById('toastCarrito');
        const toastBody = toastElement.querySelector('.toast-body');
        toastBody.textContent = texto;
        toastElement.className = `toast align-items-center text-bg-${tipo} border-0`;
        
        const toast = new window.bootstrap.Toast(toastElement);
        toast.show();
    };

    /**
     * Finaliza la compra
     */
    const handleFinalizarCompra = () => {
        if (carrito.length === 0) {
            mostrarToast('El carrito está vacío', 'warning');
            return;
        }

        mostrarToast(
            `¡Compra exitosa! Total: $${total.toLocaleString('es-CL')}`,
            'success'
        );
        
        setTimeout(() => {
            onVaciar();
            const offcanvasElement = document.getElementById('offcanvasCarrito');
            const offcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (offcanvas) {
                offcanvas.hide();
            }
        }, 1500);
    };

    /**
     * Maneja el vaciado del carrito
     */
    const handleVaciar = () => {
        if (carrito.length === 0) {
            mostrarToast('El carrito ya está vacío', 'info');
            return;
        }
        onVaciar();
        mostrarToast('Carrito vaciado', 'danger');
    };

    /**
     * Maneja la adición de productos
     */
    const handleAgregar = (producto) => {
        onAgregar(producto);
        mostrarToast(`"${producto.titulo}" cantidad aumentada`, 'info');
    };

    /**
     * Maneja la disminución de productos
     */
    const handleDisminuir = (id) => {
        const producto = carrito.find(item => item.id === id);
        onDisminuir(id);
        
        if (producto.cantidad === 1) {
            mostrarToast(`"${producto.titulo}" eliminado del carrito`, 'warning');
        }
    };

    /**
     * Maneja la eliminación de productos
     */
    const handleEliminar = (id) => {
        const producto = carrito.find(item => item.id === id);
        onEliminar(id);
        mostrarToast(`"${producto.titulo}" eliminado del carrito`, 'warning');
    };

    return (
        <>
            {/* Offcanvas del carrito */}
            <div 
                className="offcanvas offcanvas-end" 
                tabIndex="-1" 
                id="offcanvasCarrito"
                aria-labelledby="offcanvasCarritoLabel"
            >
                <div 
                    className="offcanvas-header" 
                    style={{ backgroundColor: 'var(--azul-mibu)', color: 'var(--crema-mibu)' }}
                >
                    <h5 className="offcanvas-title" id="offcanvasCarritoLabel">
                        Carrito de Compras
                    </h5>
                    <button 
                        type="button" 
                        className="btn-close btn-close-white" 
                        data-bs-dismiss="offcanvas" 
                        aria-label="Close"
                    ></button>
                </div>

                <div className="offcanvas-body d-flex flex-column">
                    {/* Lista de productos */}
                    <ul className="list-group mb-3 flex-grow-1">
                        {carrito.length === 0 ? (
                            <CartEmpty />
                        ) : (
                            carrito.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onDisminuir={handleDisminuir}
                                    onAgregar={handleAgregar}
                                    onEliminar={handleEliminar}
                                />
                            ))
                        )}
                    </ul>

                    {/* Footer con total y botones */}
                    <div className="mt-auto">
                        <div 
                            className="d-flex justify-content-between align-items-center mb-3 p-3"
                            style={{ backgroundColor: 'var(--crema-mibu)', borderRadius: '8px' }}
                        >
                            <h5 className="mb-0">Total:</h5>
                            <h4 className="mb-0" style={{ color: 'var(--rojo-mibu)' }}>
                                ${total.toLocaleString('es-CL')}
                            </h4>
                        </div>

                        <div className="d-grid gap-2">
                            <button 
                                className="btn btn-lg"
                                style={{ 
                                    backgroundColor: 'var(--azul-mibu)', 
                                    color: 'var(--crema-mibu)',
                                    opacity: carrito.length === 0 ? 0.5 : 1,
                                    cursor: carrito.length === 0 ? 'not-allowed' : 'pointer'
                                }}
                                onClick={handleFinalizarCompra}
                                disabled={carrito.length === 0}
                            >
                                Finalizar compra
                            </button>
                            <button 
                                className="btn btn-outline-danger"
                                onClick={handleVaciar}
                                disabled={carrito.length === 0}
                            >
                                Vaciar carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast para notificaciones */}
            <div className="toast-container position-fixed top-0 end-0 p-3">
                <div 
                    id="toastCarrito" 
                    className="toast align-items-center text-bg-success border-0"
                    role="alert" 
                    aria-live="assertive" 
                    aria-atomic="true"
                >
                    <div className="d-flex">
                        <div className="toast-body">
                            Producto agregado al carrito
                        </div>
                        <button 
                            type="button" 
                            className="btn-close btn-close-white me-2 m-auto" 
                            data-bs-dismiss="toast" 
                            aria-label="Close"
                        ></button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;