import { useState } from 'react';
import { createToken } from '../../api/admin.api';
import './CreateTokenModal.css';

export default function CreateTokenModal({ network, onClose, onSaved }) {
  const [form, setForm] = useState({ networkId: network._id, symbol: '', decimals: '', address: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    // Validation
    if (!form.symbol || !form.type || form.decimals === '') {
      setError('Please fill all required fields.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await createToken({
        ...form,
        decimals: Number(form.decimals),
      });
      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <h3>Add Token to {network.name}</h3>

        {error && <div className="modal-error">{error}</div>}

        <input
          placeholder="Symbol (USDT)"
          value={form.symbol}
          onChange={e => setForm({ ...form, symbol: e.target.value })}
        />

        <input
          placeholder="Decimals (6, 18)"
          value={form.decimals}
          type="number"
          onChange={e => setForm({ ...form, decimals: e.target.value })}
        />

        <input
          placeholder="Token Address (leave empty = native)"
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
        />

        <select
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
        >
          <option value="">Select Type</option>
          <option value="NATIVE">NATIVE</option>
          <option value="ERC20">ERC20</option>
        </select>

        <div className="modal-actions">
          <button onClick={onClose} disabled={loading}>Cancel</button>
          <button onClick={submit} disabled={loading}>{loading ? 'Saving...' : 'Create'}</button>
        </div>
      </div>
    </div>
  );
}
