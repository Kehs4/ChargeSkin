import { useNavigate } from 'react-router-dom';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
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
          <button className="cta-button" onClick={() => navigate('/produtos')}>Ver Produtos</button>
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

      {/* Products Preview (Mantido como Destaques) */}
      <section id="products-preview" className="products">
        <div className="container">
          <h2>Destaques</h2>
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
    </>
  );
}