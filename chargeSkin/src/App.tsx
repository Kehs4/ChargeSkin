import { useEffect, useState } from 'react';
import './index.css';
import './App.css';

import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    document.title = 'ChargeSkin | Home';
  }, []);



  return (
    <div className="landing-page">

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo"><ElectricBoltIcon fontSize='small' className='lightning' /> ChargeSkin</div>
          <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
            <a href="#home" onClick={toggleMenu}>Início</a>
            <a href="#products" onClick={toggleMenu}>Produtos</a>
            <a href="#about" onClick={toggleMenu}>Sobre</a>
            <a href="#contact" onClick={toggleMenu}>Contato</a>
          </nav>
          <div className="menu-toggle" onClick={toggleMenu}>
            ☰
          </div>
        </div>
      </header>

      {/* Section Inicial */}
      <section id="home" className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h1> <ElectricBoltIcon className='lightning-about' style={{ width: '50px', height: '40px' }} /> ChargeSkin</h1>
          </div>
          <p className='chargeskin-about'>Soluções inteligentes, modernas e práticas para o dia a dia.
            <br></br> <br></br>
            Praticidade, mobilidade e liberdade através da tecnologia.</p>
          <button className="cta-button">Ver Produtos</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="feature-card">
            <h3>Qualidade</h3>
            <p>Materiais selecionados para garantir durabilidade e brilho.</p>
          </div>
          <div className="feature-card">
            <h3>Design</h3>
            <p>Peças únicas que seguem as últimas tendências da moda.</p>
          </div>
          <div className="feature-card">
            <h3>Entrega Rápida</h3>
            <p>Receba seus produtos com agilidade e segurança.</p>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section id="products" className="products">
        <div className="container">
          <h2>Categorias em Destaque</h2>
          <div className="product-grid">
            <div className="product-item">
              <div className="product-placeholder"></div>
            </div>
            <div className="product-item">
              <div className="product-placeholder"></div>
            </div>
            <div className="product-item">
              <div className="product-placeholder"></div>
            </div>
            <div className="product-item">
              <div className="product-placeholder"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2>Sobre Nós</h2>
          <p>
            Somos uma empresa dedicada a trazer o que há de melhor no mundo dos (produtos).
            Acreditamos que um pequeno detalhe pode transformar completamente o seu visual e elevar sua autoestima.
          </p>
        </div>
      </section>

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