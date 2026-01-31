import { useState } from 'react';
import { registerApi } from '../../api/auth.api';

export default function Register() {
  const [form, setForm] = useState({});

  const submit = async () => {
    await registerApi(form);
    alert('Registered successfully');
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={submit}>Register</button>
    </div>
  );
}
