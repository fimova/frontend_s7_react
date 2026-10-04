import { useState, useEffect } from 'react';

/**
 * Hook para gestionar el carrito de compras
 * Persiste en localStorage 
 */
export const useCart = () => {

    // Estado del carrito (se carga desde localStorage con validación)
    const [carrito, setCarrito] = useState(() => {
        try {
            const carritoGuardado = localStorage.getItem('carritoMibu');

            // Si no hay nada guardado, retornar array vacío
            if (!carritoGuardado) {
                return [];
            }

            // Intentar parsear el JSON
            const carritoParseado = JSON.parse(carritoGuardado);

            // Validar que sea un array válido
            if (!Array.isArray(carritoParseado)) {
                console.warn('Datos de carrito inválidos, inicializando vacío');
                localStorage.removeItem('carritoMibu');
                return [];
            }

            return carritoParseado;
        } catch (error) {
            // Si hay error en parseo, limpiar localStorage y retornar array vacío
            console.error('Error al cargar carrito de localStorage:', error);
            localStorage.removeItem('carritoMibu');
            return [];
        }
    });

    // Guardar en localStorage cada vez que cambie el carrito
    useEffect(() => {
        try {
            localStorage.setItem('carritoMibu', JSON.stringify(carrito));
        } catch (error) {
            console.error('Error al guardar carrito en localStorage:', error);
        }
    }, [carrito]);

    /**
     * Agrega un producto al carrito
     */
    const agregarAlCarrito = (producto) => {
        const productoExistente = carrito.find(item => item.id === producto.id);

        if (productoExistente) {
            setCarrito(carrito.map(item =>
                item.id === producto.id
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            ));
        } else {
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