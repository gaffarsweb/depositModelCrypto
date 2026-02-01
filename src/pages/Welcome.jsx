import { Link } from 'react-router-dom';
import './welcome.css';

export default function Welcome() {
  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <h1 className="welcome-title">
          🚀 Crypto Deposit Platform
        </h1>

        <p className="welcome-subtitle">
          Secure multi-chain crypto deposit & withdrawal system
        </p>

        <div className="welcome-actions">
          <Link to="/login" className="welcome-link">
            <button className="welcome-btn primary">Login</button>
          </Link>

          <Link to="/register" className="welcome-link">
            <button className="welcome-btn secondary">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
