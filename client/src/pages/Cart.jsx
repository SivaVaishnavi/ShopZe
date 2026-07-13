import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loadCart = () => {
    api.get('/cart')
      .then((res) => setItems(res.data))
      .catch(() => setError('Could not load cart.'));
  };

  useEffect(() => { loadCart(); }, []);

  const handleRemove = async (id) => {
    try {
      await api.delete(`/cart/${id}`);
      loadCart();
    } catch {
      setError('Could not remove item.');
    }
  };

  const totalMRP = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discountAmount = items.reduce((sum, i) => sum + (i.price * i.quantity * (i.discount || 0)) / 100, 0);
  const deliveryCharges = 0;
  const finalPrice = Math.round(totalMRP - discountAmount + deliveryCharges);

  return (
    <div className="cart-page">
      <div className="cart-items">
        <h2>Your Cart</h2>
        {error && <p className="error-text">{error}</p>}
        {items.length === 0 && <p>Your cart is empty.</p>}
        {items.map((item) => (
          <div className="cart-item" key={item._id}>
            <img src={item.mainImg} alt={item.title} onError={(e) => (e.target.src = 'https://placehold.co/80x80')} />
            <div>
              <h4>{item.title}</h4>
              <p>Size: {item.size} &nbsp; Quantity: {item.quantity}</p>
              <p>Price: ₹{item.price}</p>
              <button className="cancel-btn" onClick={() => handleRemove(item._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div className="price-details">
          <h3>Price Details</h3>
          <p>Total MRP: <span>₹{totalMRP}</span></p>
          <p>Discount on MRP: <span>- ₹{Math.round(discountAmount)}</span></p>
          <p>Delivery Charges: <span>+ ₹{deliveryCharges}</span></p>
          <hr />
          <p className="final-price">Final Price: <span>₹{finalPrice}</span></p>
          <button className="shop-now-btn" onClick={() => navigate('/checkout')}>Place order</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
