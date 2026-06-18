import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { login, register } from '../utils/auth';
import { BG } from '../data/referenceAssets';
import './Auth.css';

export default function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'login') {
        const { user } = await login(email, password);
        if (user.role === 'admin') navigate('/?admin=1#admin-panel');
        else navigate('/');
      } else {
        await register({ username, email, password });
        navigate('/');
      }
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={{ '--auth-bg': `url(${BG.hero})` }}>
      <div className="auth-page-overlay" />
      <div className="auth-card">
        <Logo variant="hero" />
        <h1>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
        <p className="auth-sub">
          {mode === 'login'
            ? 'Sign in to manage your brand or admin content.'
            : 'Join Farokht — a default profile photo is added for you automatically.'}
        </p>

        <div className="auth-tabs">
          <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>
            Log in
          </button>
          <button type="button" className={mode === 'signup' ? 'active' : ''} onClick={() => setMode('signup')}>
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <label>
              Username
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="your_brand_name"
                required
                minLength={3}
              />
            </label>
          )}
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </label>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="btn btn-orange auth-submit" disabled={loading}>
            {loading ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Sign up'}
          </button>
        </form>

        <p className="auth-footer-links">
          <Link to="/">← Back to home</Link>
          {mode === 'login' && (
            <>
              {' · '}
              <Link to="/admin">Admin login</Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
