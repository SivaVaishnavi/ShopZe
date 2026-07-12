import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  const loadOrders = () => {
    api.get('/orders/my')
      .then((res) => setOrders(res.data))
      .catch(() => setError('Could not load orders.'));
  };

  useEffect(() => { loadOrders(); }, []);

  const handleCancel = async (id) => {
    try {
      await api.put(`/orders/${id}/cancel`);
      loadOrders();
    } catch {
      setError('Could not cancel order.');
    }
  };

  return (
    <div className="profile-page">
      <aside className="profile-sidebar">
        <p><strong>Username:</strong> {user?.username}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Orders:</strong> {orders.length}</p>
        <button className="secondary-btn" onClick={logout}>Logout</button>
      </aside>

      <main className="orders-list">
        <h2>Orders</h2>
        {error && <p className="error-text">{error}</p>}
        {orders.length === 0 && <p>No orders yet.</p>}
        {orders.map((o) => (
          <div className="order-card" key={o._id}>
            <img src={o.mainImg} alt={o.title} onError={(e) => (e.target.src = 'https://placehold.co/80x80')} />
            <div className="order-info">
              <h4>{o.title}</h4>
              <p>{o.description}</p>
              <p>Size: {o.size} &nbsp; Quantity: {o.quantity} &nbsp; Price: ₹{o.price}</p>
              <p>Payment method: {o.paymentMethod}</p>
              <p>Address: {o.address}, {o.pincode} &nbsp; Ordered on: {o.orderDate}</p>
              <p>Order status: {o.orderStatus}</p>
              {o.orderStatus !== 'Cancelled' && (
                <button className="cancel-btn" onClick={() => handleCancel(o._id)}>Cancel</button>
              )}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Profile;
