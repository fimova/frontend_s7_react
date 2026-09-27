import { useState, useEffect } from 'react';

/**
 * Hook para gestionar el carrito de compras
 * Persiste en localStorage
 */
export const useCart = () => {
    // Estado del carrito (se carga desde localStorage)
    const [carrito, setCarrito] = useState(() => {
        const carritoGuardado = localStorage.getItem('carritoMibu');
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    });

    // Guardar en localStorage cada vez que cambie el carrito
    useEffect(() => {
        localStorage.setItem('carritoMibu', JSON.stringify(carrito));
    }, [carrito]);

    /**
     * Agrega un producto al carrito
     */
    const agregarAlCarrito = (producto) => {
        const productoExistente = carrito.find(item => item.id === producto.id);

        if (productoExistente) {
            // Si existe, aumentar cantidad
            setCarrito(carrito.map(item =>
                item.id === producto.id
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            ));
        } else {
            // Si no existe, agregarlo con cantidad 1
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }
    };

    /**
     * Elimina un producto del carrito por completo
     */
    const eliminarDelCarrito = (id) => {
        setCarrito(carrito.filter(item => item.id !== id));
    };

    /**
     * Disminuye la cantidad de un producto
     */
    const disminuirCantidad = (id) => {
        const producto = carrito.find(item => item.id === id);
        
        if (producto.cantidad === 1) {
            eliminarDelCarrito(id);
        } else {
            setCarrito(carrito.map(item =>
                item.id === id
                    ? { ...item, cantidad: item.cantidad - 1 }
                    : item
            ));
        }
    };

    /**
     * Vacía el carrito completamente
     */
    const vaciarCarrito = () => {
        setCarrito([]);
    };

    /**
     * Calcula el total de productos en el carrito
     */
    const contarProductos = () => {
        return carrito.reduce((total, item) => total + item.cantidad, 0);
    };

    /**
     * Calcula el precio total del carrito
     */
    const calcularTotal = () => {
        return carrito.reduce((total, item) => {
            const precio = item.enOferta ? item.precioOferta : item.precioNormal;
            return total + (precio * item.cantidad);
        }, 0);
    };

    return {
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        disminuirCantidad,
        vaciarCarrito,
        contarProductos,
        calcularTotal
    };
};