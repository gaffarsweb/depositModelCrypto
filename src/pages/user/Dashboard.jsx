import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function UserDashboard() {
  const [wallets, setWallets] = useState([]);
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    api.get('/user/wallets').then(res => setWallets(res.data));
    api.get('/user/balances').then(res => setBalances(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>User Dashboard</h1>

      <h2>Your Wallets</h2>
      <table border="1">
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
              <td>{w.network?.name}</td>
              <td>{w.address}</td>
              <td>{w.type}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Your Balances</h2>
      <table border="1">
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
              <td>{b.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
