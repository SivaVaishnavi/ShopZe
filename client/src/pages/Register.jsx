import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', usertype: 'Customer' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form.username, form.email, form.password, form.usertype);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p className="error-text">{error}</p>}
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email address" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required minLength={6} />
        <select name="usertype" value={form.usertype} onChange={handleChange}>
          <option value="Customer">Customer</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
        <p>Already registered? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
