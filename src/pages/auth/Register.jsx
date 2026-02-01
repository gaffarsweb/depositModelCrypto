import { useState } from 'react';
import { registerApi } from '../../api/auth.api';
import { useNavigate, Link } from 'react-router-dom';
import './register.css';

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const submit = async () => {
    if (!form.name || !form.email || !form.password) {
      return setError('All fields are required');
    }

    if (form.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    try {
      setLoading(true);
      await registerApi(form);
      navigate('/login');
    } catch (err) {
      setError(
        err?.response?.data?.message || 'Registration failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>Create Account</h2>
        <p className="subtitle">Join the crypto deposit platform</p>

        {error && <div className="error">{error}</div>}

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button onClick={submit} disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </button>

        <p className="footer-text">
          Already have an account?{' '}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
