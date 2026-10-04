import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CartButton from './components/CartButton';
import Cart from './components/Cart';
import Home from './pages/Home';
import Videojuegos from './pages/Videojuegos';
import Accesorios from './pages/Accesorios';
import Recomendados from './pages/Recomendados';
import Contacto from './pages/Contacto';
import { useCart } from './hooks/useCart';
import './styles/App.css';

/**
 * Componente auxiliar para obtener la ruta actual
 */
function AppContent() {
  const location = useLocation();

  // Hook personalizado del carrito
  const {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    disminuirCantidad,
    vaciarCarrito,
    contarProductos,
    calcularTotal
  } = useCart();

  return (
    <>
      {/* Header con ruta actual para marcar link activo */}
      <Header rutaActual={location.pathname} />

      {/* Rutas de la aplicación */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/videojuegos"
          element={<Videojuegos onAgregarAlCarrito={agregarAlCarrito} carrito={carrito} />}
        />
        <Route
          path="/accesorios"
          element={<Accesorios onAgregarAlCarrito={agregarAlCarrito} carrito={carrito} />}
        />
        <Route 
          path="/recomendados" 
          element={<Recomendados onAgregarAlCarrito={agregarAlCarrito} carrito={carrito} />} 
        />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>

      {/* Footer */}
      <Footer />

      {/* Botón flotante del carrito */}
      <CartButton cantidadProductos={contarProductos()} />

      {/* Carrito lateral (offcanvas) */}
      <Cart
        carrito={carrito}
        onEliminar={eliminarDelCarrito}
        onDisminuir={disminuirCantidad}
        onAgregar={agregarAlCarrito}
        onVaciar={vaciarCarrito}
        total={calcularTotal()}
      />
    </>
  );
}

/**
 * Componente principal de la aplicación
 */
function App() {
  return (
    <Router basename="/frontend_s7_react">
      <AppContent />
    </Router>
  );
}

export default App;