import { useState } from 'react';
import { createNetwork } from '../../api/admin.api';

export default function CreateNetworkModal({ onClose, onSaved }) {
  const [form, setForm] = useState({
    name: '',
    chainKey: '',
    chainId: '',
    rpcUrl: '',
    type: 'EVM'
  });

  const submit = async () => {
    await createNetwork({
      ...form,
      chainId: form.chainId ? Number(form.chainId) : null
    });
    onSaved();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <h3>Create Network</h3>

        <input
          placeholder="Network Name (Ethereum)"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Chain Key (eth, bsc)"
          value={form.chainKey}
          onChange={e => setForm({ ...form, chainKey: e.target.value })}
        />

        <input
          placeholder="Chain ID (1, 56)"
          value={form.chainId}
          onChange={e => setForm({ ...form, chainId: e.target.value })}
        />

        <input
          placeholder="RPC URL"
          value={form.rpcUrl}
          onChange={e => setForm({ ...form, rpcUrl: e.target.value })}
        />

        <select
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
        >
          <option value="EVM">EVM</option>
          <option value="SOLANA">SOLANA</option>
          <option value="TRON">TRON</option>
          <option value="SUI">SUI</option>
        </select>

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={submit}>Save</button>
        </div>
      </div>
    </div>
  );
}
