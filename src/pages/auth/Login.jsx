import { useState } from 'react';
import { loginApi } from '../../api/auth.api';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      setLoading(true);
      const res = await loginApi({ email, password });

      login(res.data);

      navigate(res.data.role === 'ADMIN' ? '/admin' : '/user');
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        'Invalid email or password'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={submit}>
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Secure Crypto Dashboard Login</p>

        {error && <div className="login-error">{error}</div>}

        <div className="login-field">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="login-field">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button className="login-btn" disabled={loading}>
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
