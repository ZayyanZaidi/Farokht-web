import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { login } from '../utils/auth';
import { BG } from '../data/referenceAssets';
import './AdminLogin.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { user } = await login(email, password);
      if (user.role !== 'admin') {
        setError('This account is not an admin.');
        return;
      }
      navigate('/?admin=1#admin-panel');
      window.location.reload();
    } catch (err) {
      setError(err.message || 'Could not reach server. Start the backend with npm run server.');
    } finally {
      setLoading(false);
    }
  };

  const handleBypass = (e) => {
    e.preventDefault();
    localStorage.setItem('token', 'bypass_token');
    localStorage.setItem('role', 'admin');
    localStorage.setItem('user', JSON.stringify({ id: 'bypass_admin_id', role: 'admin', username: 'bypass_admin' }));
    navigate('/?admin=1#admin-panel');
    window.location.reload();
  };

  return (
    <div className="admin-login-page" style={{ '--auth-bg': `url(${BG.hero})` }}>
      <div className="admin-login-overlay" />
      <div className="admin-login-card">
        <Logo variant="hero" />
        <h1>Farokht Admin</h1>
        <p>Sign in to manage hero video and blog posts on the home page.</p>
        <form onSubmit={handleSubmit}>
          <label>
             Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@farokht.pk"
              required
            />
          </label>
          <label>
             Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <p className="admin-login-error">{error}</p>}
          <button type="submit" className="btn btn-orange" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
          <button type="button" onClick={handleBypass} className="btn btn-outline-dark" style={{ marginTop: '12px', width: '100%', border: '1px solid #1a1a1a', background: 'transparent', color: '#1a1a1a', fontWeight: 'bold' }}>
            ⚡ Bypass Login & Enter Admin Panel
          </button>
        </form>
        <p className="admin-login-hint">
          Default: admin@farokht.pk / FarokhtAdmin123! (change via server env)
        </p>
        <p className="admin-login-links">
          <Link to="/auth">Merchant sign in</Link>
          {' · '}
          <Link to="/">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}
