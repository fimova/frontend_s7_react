import { useEffect } from 'react';

/**
 * Carrito lateral (offcanvas)
 * Muestra productos, permite eliminar, vaciar y finalizar compra
 */
const Cart = ({ 
    carrito, 
    onEliminar, 
    onDisminuir, 
    onAgregar, 
    onVaciar, 
    total 
}) => {

    useEffect(() => {
        // Inicializar toast
        const toastElList = document.querySelectorAll('.toast');
        toastElList.forEach(toastEl => {
            new window.bootstrap.Toast(toastEl);
        });
    }, []);

    /**
     * Finaliza la compra (simulación)
     */
    const finalizarCompra = () => {
        if (carrito.length === 0) {
            const toastElement = document.getElementById('toastCarrito');
            const toastBody = toastElement.querySelector('.toast-body');
            toastBody.textContent = 'El carrito está vacío';
            toastElement.className = 'toast align-items-center text-bg-warning border-0';
            const toast = new window.bootstrap.Toast(toastElement);
            toast.show();
            return;
        }

        const toastElement = document.getElementById('toastCarrito');
        const toastBody = toastElement.querySelector('.toast-body');
        toastBody.textContent = `¡Compra exitosa! Total: $${total.toLocaleString('es-CL')}`;
        toastElement.className = 'toast align-items-center text-bg-success border-0';
        const toast = new window.bootstrap.Toast(toastElement);
        toast.show();
        
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
            const toastElement = document.getElementById('toastCarrito');
            const toastBody = toastElement.querySelector('.toast-body');
            toastBody.textContent = 'El carrito ya está vacío';
            toastElement.className = 'toast align-items-center text-bg-info border-0';
            const toast = new window.bootstrap.Toast(toastElement);
            toast.show();
            return;
        }
        onVaciar();
        
        const toastElement = document.getElementById('toastCarrito');
        const toastBody = toastElement.querySelector('.toast-body');
        toastBody.textContent = 'Carrito vaciado';
        toastElement.className = 'toast align-items-center text-bg-danger border-0';
        const toast = new window.bootstrap.Toast(toastElement);
        toast.show();
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

                <div className="offcanvas-body">
                    <ul className="list-group mb-3">
                        {carrito.length === 0 ? (
                            <li className="list-group-item text-center text-muted">
                                El carrito está vacío
                            </li>
                        ) : (
                            carrito.map((item) => {
                                const precio = item.enOferta ? item.precioOferta : item.precioNormal;
                                const subtotal = precio * item.cantidad;

                                return (
                                    <li 
                                        key={item.id} 
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        <div>
                                            <strong>{item.titulo}</strong>
                                            <br />
                                            <small className="text-muted">
                                                ${precio.toLocaleString('es-CL')} x {item.cantidad}
                                            </small>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="badge bg-primary rounded-pill">
                                                ${subtotal.toLocaleString('es-CL')}
                                            </span>
                                            
                                            <div className="btn-group btn-group-sm">
                                                <button 
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => onDisminuir(item.id)}
                                                >
                                                    -
                                                </button>
                                                <button 
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => onAgregar(item)}
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button 
                                                className="btn btn-sm btn-danger btn-eliminar"
                                                onClick={() => onEliminar(item.id)}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </li>
                                );
                            })
                        )}
                    </ul>

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
                                style={{ backgroundColor: 'var(--azul-mibu)', color: 'var(--crema-mibu)' }}
                                onClick={finalizarCompra}
                            >
                                Finalizar compra
                            </button>
                            <button 
                                className="btn btn-outline-danger"
                                onClick={handleVaciar}
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