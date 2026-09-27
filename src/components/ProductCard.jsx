import { useState } from 'react';

/**
 * Tarjeta de producto individual
 * Muestra información del producto y botón para agregar al carrito
 */
const ProductCard = ({ producto, onAgregar }) => {
    
    const [isHover, setIsHover] = useState(false);

    return (
        <div className="col-12 col-md-6 col-xl-4">
            <article 
                className={`card producto h-100 ${isHover ? 'tarjeta-hover' : ''}`}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                
                {/* Mostrar badge de oferta solo si está en oferta */}
                {producto.enOferta && (
                    <span className="oferta">¡Oferta especial!</span>
                )}

                <h3 className="card-title">{producto.titulo}</h3>

                <figure className="imagen-producto">
                    <img 
                        src={producto.imagen} 
                        alt={producto.alt}
                        title={producto.titulo}
                    />
                    <figcaption>{producto.info}</figcaption>
                </figure>

                <div className="card-body">
                    <p className="card-text">{producto.descripcion}</p>

                    {/* Renderizado condicional de precios */}
                    {producto.enOferta ? (
                        <div>
                            <p className="precio-normal">
                                <del>${producto.precioNormal.toLocaleString('es-CL')}</del>
                            </p>
                            <p className="precio">
                                ${producto.precioOferta.toLocaleString('es-CL')}
                            </p>
                        </div>
                    ) : (
                        <p className="precio">
                            ${producto.precioNormal.toLocaleString('es-CL')}
                        </p>
                    )}

                    <button 
                        className="btn boton-producto"
                        onClick={() => onAgregar(producto)}
                    >
                        Agregar al carrito
                    </button>
                </div>
            </article>
        </div>
    );
};

export default ProductCard;