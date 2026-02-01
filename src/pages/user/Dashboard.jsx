import { useEffect, useState } from 'react';
import api from '../../api/axios';
import './userDashboard.css';

export default function UserDashboard() {
  const [wallets, setWallets] = useState([]);
  const [balances, setBalances] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [walletRes, balanceRes, txRes] = await Promise.all([
          api.get('/user/wallets'),
          api.get('/user/balances'),
          api.get('/user/transactions') // ledger API
        ]);

        setWallets(walletRes.data);
        setBalances(balanceRes.data);
        setTransactions(txRes.data);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="dashboard-loading">Loading dashboard...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="dashboard-container">
      <h1>User Dashboard</h1>

      {/* WALLET TABLE */}
      <section className="card">
        <h2>Your Wallets</h2>
        <table>
          <thead>
            <tr>
              <th>Network</th>
              <th>Address</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {wallets.map(w => (
              <tr key={w._id}>
                <td>{w.network}</td>
                <td className="mono">{w.address}</td>
                <td>{w.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* BALANCE TABLE */}
      <section className="card">
        <h2>Your Balances</h2>
        <table>
          <thead>
            <tr>
              <th>Token</th>
              <th>Network</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {balances.map(b => (
              <tr key={b._id}>
                <td>{b.token?.symbol}</td>
                <td>{b.network?.name}</td>
                <td className="amount">{b.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* TRANSACTIONS / LEDGER */}
      <section className="card">
        <h2>Transactions</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Token</th>
              <th>Network</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx._id}>
                <td>{new Date(tx.createdAt).toLocaleString()}</td>
                <td className={tx.type === 'DEPOSIT' ? 'deposit' : 'withdraw'}>
                  {tx.type}
                </td>
                <td>{tx.token?.symbol}</td>
                <td>{tx.network?.name}</td>
                <td className="amount">{tx.amount}</td>
                <td>
                  <span className={`status ${tx.status?.toLowerCase() || 'completed'}`}>
                    {tx.status || 'COMPLETED'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
