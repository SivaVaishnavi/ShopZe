import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ mobile: '', address: '', pincode: '', paymentMethod: 'COD' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/cart').then((res) => setItems(res.data)).catch(() => setError('Could not load cart.'));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      for (const item of items) {
        await api.post('/orders', {
          name: user.username,
          email: user.email,
          mobile: form.mobile,
          address: form.address,
          pincode: form.pincode,
          title: item.title,
          mainImg: item.mainImg,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
          discount: item.discount,
          paymentMethod: form.paymentMethod,
          orderDate: new Date().toISOString().split('T')[0],
          cartItemId: item._id,
        });
      }
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) return <p style={{ padding: '2rem' }}>Your cart is empty.</p>;

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handlePlaceOrder}>
        <h2>Checkout</h2>
        {error && <p className="error-text">{error}</p>}
        <input name="mobile" placeholder="Mobile number" value={form.mobile} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} required />
        <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
          <option value="COD">Cash on Delivery</option>
          <option value="netbanking">Net Banking</option>
          <option value="card">Credit/Debit Card</option>
          <option value="upi">UPI</option>
        </select>
        <button type="submit" disabled={loading}>{loading ? 'Placing order...' : 'Confirm Order'}</button>
      </form>
    </div>
  );
};

export default Checkout;
