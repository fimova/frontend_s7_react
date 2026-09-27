import { useEffect } from 'react';

/**
 * Botón flotante que abre el carrito lateral
 * Muestra badge con cantidad de productos
 */
const CartButton = ({ cantidadProductos }) => {

    return (
        <button 
            className="btn btn-primary position-fixed bottom-0 end-0 m-3 rounded-circle carrito-flotante" 
            type="button"
            data-bs-toggle="offcanvas" 
            data-bs-target="#offcanvasCarrito" 
            aria-controls="offcanvasCarrito"
            style={{ width: '60px', height: '60px', zIndex: 1050 }}
        >
            🛒
            <span 
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
                {cantidadProductos}
            </span>
        </button>
    );
};

export default CartButton;