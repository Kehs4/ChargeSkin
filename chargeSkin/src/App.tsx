import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import './index.css';
import './App.css';

import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductsPage from './ProductsPage';
import HomePage from './HomePage';
import Cart from '../components/Cart';
import { useCart } from '../contexts/CartContext';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleCart, cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Função para navegar para âncoras na página inicial
  const handleHashLink = (hash: string) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    document.title = location.pathname === '/produtos' ? 'ChargeSkin | Produtos' : 'ChargeSkin | Home';
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);


  return (
    <div className="landing-page">

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo"><ElectricBoltIcon fontSize='small' className='lightning' /> ChargeSkin</div>
          <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
            <Link to="/" onClick={toggleMenu}>Início</Link>
            <Link to="/produtos" onClick={toggleMenu}>Produtos</Link>
            <a href="#about" onClick={(e) => { e.preventDefault(); handleHashLink('about'); }}>Sobre</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleHashLink('contact'); }}>Contato</a>
          </nav>
          <div className="header-right">
            <button onClick={toggleCart} className="cart-toggle-button">
              <ShoppingCartIcon />
              {cartItems.length > 0 && <span className="cart-badge">{cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0)}</span>}
            </button>
            <div className="menu-toggle" onClick={toggleMenu}>
              ☰
            </div>
          </div>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/produtos" element={<ProductsPage />} />
        </Routes>
        <Cart />
      </main>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-col">
              <h4>ChargeSkin</h4>
            </div>
            <div className="footer-col">
              <h4>Contato</h4>
              <p>Email: contato@chargeskin.com.br</p>
              <p>Tel: (11) 91331-0861</p>
            </div>
            <div className="footer-col">
              <h4>Redes Sociais</h4>
              <div style={{ marginBottom: '8px' }}>
                <a href='https://www.instagram.com/neymarjr' target='_blank' rel='noopener noreferrer'>
                  <p><InstagramIcon fontSize='small' /> Instagram</p>
                </a>
              </div>
              <div>
                <p><FacebookIcon fontSize='small' /> Facebook</p>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App