import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px'
    }}>
      <h1>🚀 Crypto Deposit Platform</h1>
      <p>Secure multi-chain crypto deposit & withdrawal system</p>

      <div style={{ display: 'flex', gap: '15px' }}>
        <Link to="/login">
          <button style={{ padding: '10px 20px' }}>Login</button>
        </Link>

        <Link to="/register">
          <button style={{ padding: '10px 20px' }}>Sign Up</button>
        </Link>
      </div>
    </div>
  );
}
