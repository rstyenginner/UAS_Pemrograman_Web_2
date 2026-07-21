import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { apiRequest } from '../utils/api.js';

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const result = await apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (result.status) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.data));

      if (result.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      alert(result.message);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-visual">
        <div className="auth-logo image-logo">
          <img src="/images/logo-perpustakaan-digital.png" alt="Logo Perpustakaan Digital" />
        </div>
        <h1>Selamat Datang Kembali</h1>
        <p>Login untuk membaca koleksi peminjaman, dan mengajukan peminjaman.</p>
      </div>

      <div className="auth-card">
        <span className="section-label">Login</span>
        <h2>Masuk Akun</h2>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />

          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />

          <button className="btn btn-primary full" disabled={loading}>
            <LogIn size={18} />
            {loading ? 'Memproses...' : 'Login'}
          </button>
        </form>

        <p className="small-text">
          Belum punya akun? <Link to="/register">Register sekarang</Link>
        </p>
        <p className="small-text">
          kembali ke Dashboard <Link to="/">Kembali</Link>
        </p>
      </div>
    </section>
  );
}
