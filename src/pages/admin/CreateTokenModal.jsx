import { useState } from 'react';
import { createToken } from '../../api/admin.api';

export default function CreateTokenModal({ network, onClose, onSaved }) {
  const [form, setForm] = useState({ networkId: network._id });

  const submit = async () => {
    await createToken(form);
    onSaved();
    onClose();
  };

  return (
    <div className="modal">
      <h3>Add Token to {network.name}</h3>

      <input placeholder="Symbol" onChange={e => setForm({ ...form, symbol: e.target.value })} />
      <input placeholder="Decimals" onChange={e => setForm({ ...form, decimals: Number(e.target.value) })} />
      <input placeholder="Token Address (empty = native)" onChange={e => setForm({ ...form, address: e.target.value })} />
      <select onChange={e => setForm({ ...form, type: e.target.value })}>
        <option>Select Type</option>
        <option value="NATIVE">NATIVE</option>
        <option value="ERC20">ERC20</option>
      </select>

      <button onClick={submit}>Create</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}
