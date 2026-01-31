import { useEffect, useState } from 'react';
import { getNetworksFull } from '../../api/admin.api';
import CreateTokenModal from './CreateTokenModal'
import CreateNetworkModal from './CreateNetworkModal'

export default function AdminDashboard() {
  const [networks, setNetworks] = useState([]);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [activeNetwork, setActiveNetwork] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getNetworksFull();
    setNetworks(res.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Networks</h1>
        <button onClick={() => setShowNetworkModal(true)}>
          + Create Network
        </button>
      </div>

      {networks.map(network => (
        <div key={network._id} style={{
          border: '1px solid #ccc',
          marginBottom: 20,
          padding: 15
        }}>
          <h2>
            {network.name} ({network.type})
          </h2>
          <p>Chain ID: {network.chainId || '-'}</p>
          <p>RPC: {network.rpcUrl}</p>
          <p>Status: {network.isEnabled ? 'Enabled' : 'Disabled'}</p>

          <h3 style={{ marginTop: 10 }}>Tokens</h3>

          <table border="1" width="100%">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Type</th>
                <th>Decimals</th>
                <th>Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {network.tokens.map(token => (
                <tr key={token._id}>
                  <td>{token.symbol}</td>
                  <td>{token.type}</td>
                  <td>{token.decimals}</td>
                  <td>{token.address || 'Native'}</td>
                  <td>{token.isEnabled ? 'Enabled' : 'Disabled'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            style={{ marginTop: 10 }}
            onClick={() => setActiveNetwork(network)}
          >
            + Create Token
          </button>
        </div>
      ))}

      {/* MODALS */}
      {showNetworkModal && (
        <CreateNetworkModal onClose={() => setShowNetworkModal(false)} onSaved={load} />
      )}

      {activeNetwork && (
        <CreateTokenModal
          network={activeNetwork}
          onClose={() => setActiveNetwork(null)}
          onSaved={load}
        />
      )}
    </div>
  );
}
