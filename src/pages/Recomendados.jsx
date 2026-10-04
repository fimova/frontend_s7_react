import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

/**
 * Página de productos recomendados
 * Carga datos dinámicamente usando fetch API (se escogió una de Pokémon para ejemplificar)
 */
const Recomendados = ({ onAgregarAlCarrito, carrito }) => {
    
    // Estado para productos cargados
    const [productos, setProductos] = useState([]);
    
    // Estado para indicar si está cargando
    const [cargando, setCargando] = useState(true);
    
    // Estado para errores
    const [error, setError] = useState(null);

    /**
     * Verifica si un producto está en el carrito
     */
    const estaEnCarrito = (productoId) => {
        return carrito.some(item => item.id === productoId);
    };

    /**
     * Cargar productos desde API externa
     * Simula productos recomendados con datos de una API pública
     */
    useEffect(() => {
        const cargarProductos = async () => {
            try {
                setCargando(true);
                setError(null);

                // Cargar 6 Pokémon aleatorios
                const promesas = [];
                for (let i = 0; i < 6; i++) {
                    const randomId = Math.floor(Math.random() * 150) + 1;
                    promesas.push(
                        fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
                            .then(res => res.json())
                    );
                }

                const pokemones = await Promise.all(promesas);

                // Transformar los datos de la API al formato usado
                const productosTransformados = pokemones.map((pokemon, index) => {
                    const precioNormal = Math.floor(Math.random() * 50000) + 20000;
                    const precioOferta = Math.floor(precioNormal * 0.8);
                    
                    return {
                        id: 200 + index, // IDs diferentes para no chocar
                        titulo: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} Figura`,
                        imagen: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default,
                        alt: pokemon.name,
                        titleImagen: `${pokemon.name} - Figura coleccionable`,
                        info: `Tipo: ${pokemon.types.map(t => t.type.name).join(', ')}`,
                        descripcion: `Figura coleccionable oficial de ${pokemon.name}. Altura: ${pokemon.height / 10}m, Peso: ${pokemon.weight / 10}kg. Stock limitado.`,
                        precioNormal: precioNormal,
                        precioOferta: precioOferta,
                        enOferta: Math.random() > 0.5
                    };
                });

                setProductos(productosTransformados);
            } catch (err) {
                console.error('Error:', err);
                setError('No pudimos cargar los productos recomendados. Intenta más tarde.');
            } finally {
                setCargando(false);
            }
        };

        cargarProductos();
    }, []); // Se ejecuta solo una vez al montar el componente

    /**
     * Agrega un producto al carrito y muestra un toast
     */
    const handleAgregar = (producto) => {
        onAgregarAlCarrito(producto);
        
        // Mostrar toast usando Bootstrap
        const toastElement = document.getElementById('toastCarrito');
        if (toastElement) {
            const toastBody = toastElement.querySelector('.toast-body');
            toastBody.textContent = `"${producto.titulo}" agregado al carrito`;
            toastElement.className = 'toast align-items-center text-bg-success border-0';
            
            const toast = new window.bootstrap.Toast(toastElement);
            toast.show();
        }
    };

    return (
        <main>
            <section className="catalogo">
                <h2>Pokémon Recomendados</h2>
                <p className="text-muted text-center mb-4">
                    Figuras coleccionables de Pokémon
                </p>

                {/* Renderizado condicional: Cargando */}
                {cargando && (
                    <div className="container text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                        <p className="mt-3">Cargando recomendados...</p>
                    </div>
                )}

                {/* Renderizado condicional: Error */}
                {error && (
                    <div className="container">
                        <div className="alert alert-danger text-center" role="alert">
                            {error}
                        </div>
                    </div>
                )}

                {/* Renderizado condicional: Productos cargados */}
                {!cargando && !error && (
                    <div className="container">
                        <div className="row g-4">
                            {productos.map(producto => (
                                <ProductCard 
                                    key={producto.id}
                                    producto={producto}
                                    onAgregar={handleAgregar}
                                    productoEnCarrito={estaEnCarrito(producto.id)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
};

export default Recomendados;