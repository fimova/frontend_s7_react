/**
 * Componente para renderizar una fila individual del carrito
 * Separa la lógica de cada item para mayor claridad y modularidad
 * 
 * Props:
 * - item: Producto en el carrito
 * - onDisminuir: Callback para disminuir cantidad
 * - onAgregar: Callback para aumentar cantidad
 * - onEliminar: Callback para eliminar producto
 */
const CartItem = ({ item, onDisminuir, onAgregar, onEliminar }) => {
    
    const precio = item.enOferta ? item.precioOferta : item.precioNormal;
    const subtotal = precio * item.cantidad;

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <strong>{item.titulo}</strong>
                <br />
                <small className="text-muted">
                    ${precio.toLocaleString('es-CL')} x {item.cantidad}
                </small>
            </div>
            
            <div className="d-flex align-items-center gap-2">
                {/* Badge con subtotal */}
                <span className="badge bg-primary rounded-pill">
                    ${subtotal.toLocaleString('es-CL')}
                </span>
                
                {/* Botones para modificar cantidad */}
                <div className="btn-group btn-group-sm">
                    <button 
                        className="btn btn-outline-secondary"
                        onClick={() => onDisminuir(item.id)}
                        title="Disminuir cantidad"
                    >
                        −
                    </button>
                    <button 
                        className="btn btn-outline-secondary"
                        onClick={() => onAgregar(item)}
                        title="Aumentar cantidad"
                    >
                        +
                    </button>
                </div>

                {/* Botón eliminar */}
                <button 
                    className="btn btn-sm btn-danger btn-eliminar"
                    onClick={() => onEliminar(item.id)}
                    title="Eliminar producto"
                >
                    ✕
                </button>
            </div>
        </li>
    );
};

export default CartItem;