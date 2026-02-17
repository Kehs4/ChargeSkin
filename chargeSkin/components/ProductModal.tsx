import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import PixIcon from '@mui/icons-material/Pix';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    description?: string;
    colors?: string[];
}

interface ProductModalProps {
    product: Product | null;
    onClose: () => void;
}

const paymentMethods: string[] = [
    'Visa', 'Mastercard', 'Elo', 'Pix', 'Boleto'
];

const paymentIcons: { [key: string]: JSX.Element | string } = {
    'Visa': '/visa.png',
    'Mastercard': 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
    'Elo': '/elo-seeklogo.png',
    'Pix': <PixIcon style={{color: '#32CFC5'}} />,
    'Boleto': <ReceiptLongIcon style={{ color: '#9c423f'}} />
};



export default function ProductModal({ product, onClose }: ProductModalProps) {
    const { addToCart } = useCart();
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

    if (!product) return null;

    const handleAddToCart = () => {
        addToCart(product);
        onClose(); // Fecha o modal após adicionar ao carrinho
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                <div className="modal-body">
                    <div className="modal-image">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="modal-details">
                        <h2>{product.name}</h2>
                        <p className="product-description">{product.description || 'Descrição do produto não disponível.'}</p>

                        <div className="product-colors">
                            <h4>Cores Disponíveis:</h4>
                            <div className="color-options">
                                {(product.colors || ['Padrão']).map(color => (
                                    <span key={color} className="color-swatch" title={color} style={{ backgroundColor: color.toLowerCase() === 'padrão' ? '#ccc' : color.toLowerCase() }}></span>
                                ))}
                            </div>
                        </div>

                        <div className="product-payment">
                            <h4>Formas de Pagamento:</h4>
                            <div className="payment-icons">
                                {paymentMethods.map(method => {
                                    const iconContent = paymentIcons[method];
                                    const isSelected = selectedPayment === method;
                                    return (
                                        <div
                                            key={method}
                                            className={`payment-icon ${isSelected ? 'selected' : ''}`}
                                            onClick={() => setSelectedPayment(method)}
                                        >
                                            {typeof iconContent === 'string' ? <img src={iconContent} alt={method} /> : (iconContent || method)}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="product-installments">
                            <h4>Ou parcele em até 12x:</h4>
                            <select className="installments-select">
                                {Array.from({ length: 12 }, (_, i) => i + 1).map(installments => {
                                    const installmentValue = product.price / installments;
                                    return (
                                        <option key={installments}>
                                            {installments}x de R$ {installmentValue.toFixed(2).replace('.', ',')}
                                            {installments > 1 && ' sem juros'}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>

                        <p className="modal-price">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                        <button className="cta-button" onClick={handleAddToCart}>Adicionar ao Carrinho</button>
                    </div>
                </div>
            </div>
        </div>
    );
}