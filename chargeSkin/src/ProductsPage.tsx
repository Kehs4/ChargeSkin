import { useState } from 'react';
import ProductModal from '../components/ProductModal';
import { useCart } from '../contexts/CartContext';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  colors: string[];
}

// Dados simulados de produtos (Mock)
const PRODUCTS_DATA: Product[] = [
  { id: 1, name: 'Capa Slim Crystal', category: 'Capas', price: 49.90, image: '/phoneCape2.jpeg', description: 'Proteção ultrafina e transparente que não esconde o design do seu celular.', colors: ['Transparent', 'Black', 'Blue'] },
  { id: 2, name: 'Capa Charge MagSafe', category: 'Carregadores', price: 89.90, image: '/phonecape.jpeg', description: 'Carregue seu celular com a máxima praticidade da tecnologia MagSafe.', colors: ['White', 'Black'] },
  { id: 3, name: 'Película de Vidro 3D', category: 'Proteção', price: 29.90, image: '/CapaCharge.jpeg', description: 'Cobertura completa da tela com bordas arredondadas para uma proteção impecável.', colors: ['Padrão'] },
  { id: 4, name: 'Carregador Portátil ChargeSkin', category: 'Cabos', price: 39.90, image: '/phoneCharging3.jpeg', description: 'Cabo resistente e estiloso para carregar seus dispositivos com velocidade.', colors: ['Silver', 'Gold', 'Gray'] },
  { id: 5, name: 'Capa de Couro Premium', category: 'Capas', price: 129.90, image: 'https://via.placeholder.com/300x300/e0e0e0/333?text=Capa+Couro', description: 'Elegância e proteção com couro legítimo de alta qualidade.', colors: ['Brown', 'Black'] },
  { id: 6, name: 'Power Bank 10000mAh', category: 'Carregadores', price: 159.90, image: 'https://via.placeholder.com/300x300/e0e0e0/333?text=Power+Bank', description: 'Bateria de alta capacidade para manter seus dispositivos sempre carregados.', colors: ['Black', 'White'] },
  { id: 7, name: 'Suporte Veicular MagSafe', category: 'Acessórios', price: 79.90, image: 'https://via.placeholder.com/300x300/e0e0e0/333?text=Suporte', description: 'Fixe seu celular no carro de forma segura e prática com a tecnologia MagSafe.', colors: ['Black'] },
  { id: 8, name: 'Fone Bluetooth Pro', category: 'Áudio', price: 299.90, image: '/bluetoothHeadPhone.jpeg', description: 'Qualidade de som superior e cancelamento de ruído para uma imersão total.', colors: ['White', 'Space Gray'] },
  { id: 9, name: 'Kit Limpeza de Tela', category: 'Acessórios', price: 19.90, image: 'https://via.placeholder.com/300x300/e0e0e0/333?text=Kit+Limpeza', description: 'Mantenha suas telas sempre limpas e livres de marcas de dedo.', colors: ['Padrão'] },
  { id: 10, name: 'Capa Anti-Impacto', category: 'Capas', price: 69.90, image: 'https://via.placeholder.com/300x300/e0e0e0/333?text=Capa+Impacto', description: 'Proteção robusta contra quedas e impactos para o seu dia a dia.', colors: ['Black', 'Red', 'Green'] },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const itemsPerPage = 8; // Quantidade de produtos por página
  const { addToCart } = useCart();

  // Extrair categorias únicas
  const categories = ['Todos', ...new Set(PRODUCTS_DATA.map(p => p.category))];

  // Lógica de Filtragem
  const filteredProducts = PRODUCTS_DATA.filter(product => {
    if (selectedCategory === 'Todos') return true;
    return product.category === selectedCategory;
  });

  // Lógica de Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="products-page" style={{ padding: '120px 0 60px', minHeight: '80vh', backgroundColor: '#f9f9f9' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#333', fontSize: '2rem' }}>Nossos Produtos</h2>

        {/* Filtros de Categoria */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => { setSelectedCategory(category); setCurrentPage(1); }}
              style={{
                padding: '10px 20px',
                borderRadius: '25px',
                border: '1px solid #ddd',
                backgroundColor: selectedCategory === category ? '#333' : '#fff',
                color: selectedCategory === category ? '#fff' : '#333',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: '500',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid de Produtos */}
        <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div
                key={product.id}
                className="product-item"
                style={{ display: 'flex', flexDirection: 'column', padding: '15px', border: '1px solid #eee', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}
                onClick={() => handleProductClick(product)}
              >
                <div className="product-image" style={{ width: '100%', height: '220px', backgroundColor: '#f4f4f4', marginBottom: '15px', borderRadius: '8px', overflow: 'hidden' }}>
                   <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', color: '#333' }}>{product.name}</h4>
                <span style={{ fontSize: '0.85rem', color: '#888', marginBottom: '15px', display: 'inline-block', padding: '4px 8px', backgroundColor: '#f0f0f0', borderRadius: '4px', alignSelf: 'flex-start' }}>{product.category}</span>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p style={{ fontWeight: 'bold', fontSize: '1.3rem', color: '#333', margin: 0 }}>
                    R$ {product.price.toFixed(2).replace('.', ',')}
                    </p>
                    <button
                      className="cta-button"
                      style={{ padding: '8px 20px', fontSize: '0.9rem' }}
                      onClick={(e) => {
                        e.stopPropagation(); // Impede que o modal seja aberto
                        addToCart(product);
                      }}
                    >Comprar</button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>Nenhum produto encontrado nesta categoria.</p>
          )}
        </div>

        {/* Controles de Paginação */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '50px' }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: currentPage === number ? '#333' : '#e0e0e0',
                  color: currentPage === number ? '#fff' : '#333',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  transition: 'background-color 0.3s'
                }}
              >
                {number}
              </button>
            ))}
          </div>
        )}
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
};