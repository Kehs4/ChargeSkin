import { useCart } from '../contexts/CartContext';

export default function Cart() {
    const { cartItems, isCartOpen, toggleCart, removeFromCart } = useCart();

    const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

    if (!isCartOpen) return null;

    return (
        <div className="cart-overlay" onClick={toggleCart}>
            <div className="cart-content" onClick={(e) => e.stopPropagation()}>
                <div className="cart-header">
                    <h3>Meu Carrinho</h3>
                    <button className="cart-close" onClick={toggleCart}>&times;</button>
                </div>
                <div className="cart-body">
                    {cartItems.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#666' }}>Seu carrinho está vazio.</p>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} />
                                <div className="cart-item-details">
                                    <p>{item.name}</p>
                                    <p style={{ color: '#888' }}>Qtd: {item.quantity}</p>
                                </div>
                                <p className="cart-item-price">R$ {(item.price * (item.quantity || 1)).toFixed(2).replace('.', ',')}</p>
                                <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>&times;</button>
                            </div>
                        ))
                    )}
                </div>
                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <h4>Total: R$ {total.toFixed(2).replace('.', ',')}</h4>
                        <button className="cta-button" onClick={() => alert('Integração com pagamento não incluída.')}>
                            Finalizar Compra
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}