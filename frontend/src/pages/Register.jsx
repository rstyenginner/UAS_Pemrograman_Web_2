import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LibraryBig, UserPlus } from 'lucide-react';
import { apiRequest } from '../utils/api.js';
export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const result = await apiRequest('/register', { method: 'POST', body: JSON.stringify(form) });
    setLoading(false);
    if (result.status) {
      alert('Register berhasil. Silakan login.');
      navigate('/login');
    } else alert(result.message);
  }
  return (
    <section className="auth-page">
      <div className="auth-visual register">
        <div className="auth-logo image-logo">
          <img src="/images/logo-perpustakaan-digital.png" alt="Logo Perpustakaan Digital" />
        </div>
        <h1>Buat Akun Member</h1>
        <p>Daftar sebagai member untuk mengajukan peminjaman buku fisik dan memantau riwayat peminjaman.</p>
      </div>
      <div className="auth-card">
        <span className="section-label">Register</span>
        <h2>Daftar Member</h2>
        <form onSubmit={handleSubmit}>
          <label>Nama</label>
          <input name="name" value={form.name} onChange={handleChange} required />
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
          <button className="btn btn-primary full" disabled={loading}>
            <UserPlus size={18} />
            {loading ? 'Memproses...' : 'Register'}
          </button>
        </form>
        <p className="small-text">
          Sudah punya akun? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}
