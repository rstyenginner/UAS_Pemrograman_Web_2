import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import { apiRequest } from '../utils/api.js';

const initialForm = {
  name: '',
  slug: '',
  description: '',
};

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [activeView, setActiveView] = useState('list');

  async function loadCategories() {
    const result = await apiRequest('/categories');

    if (result.status) {
      setCategories(result.data || []);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function resetForm() {
    setForm(initialForm);
    setEditingId(null);
  }

  function fillEdit(category) {
    setEditingId(category.id);

    setForm({
      name: category.name || '',
      slug: category.slug || '',
      description: category.description || '',
    });

    setActiveView('form');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await apiRequest(editingId ? `/categories/${editingId}` : '/categories', {
      method: editingId ? 'PUT' : 'POST',
      body: JSON.stringify(form),
    });

    alert(result.message);

    if (result.status) {
      resetForm();
      loadCategories();
      setActiveView('list');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Yakin ingin menghapus kategori ini?')) return;

    const result = await apiRequest(`/categories/${id}`, {
      method: 'DELETE',
    });

    alert(result.message);

    if (result.status) {
      loadCategories();
    }
  }

  return (
    <>
      <Navbar />

      <main className="container">
        <div className="section-heading">
          <div>
            <span className="section-label">Admin</span>
            <h2>Kelola Kategori</h2>
            <p className="muted">Tambahkan kategori baru atau kelola daftar kategori buku.</p>
          </div>

          <div className="heading-actions">
            <Link to="/admin" className="btn btn-outline small">
              ← Kembali ke Dashboard
            </Link>
          </div>
        </div>

        <div className="admin-tabs-wrapper">
          <div className="admin-tabs">
            <button
              className={activeView === 'list' ? 'tab-btn active' : 'tab-btn'}
              onClick={() => {
                setActiveView('list');
                resetForm();
              }}
            >
              <span className="tab-icon">🗂️</span>
              <span>
                <strong>Daftar Kategori</strong>
              </span>
            </button>

            <button
              className={activeView === 'form' ? 'tab-btn active' : 'tab-btn'}
              onClick={() => {
                setActiveView('form');
                resetForm();
              }}
            >
              <span className="tab-icon">➕</span>
              <span>
                <strong>Tambah Kategori</strong>
              </span>
            </button>
          </div>
        </div>

        {activeView === 'form' && (
          <div className="form-card compact">
            <h3>{editingId ? 'Edit Kategori' : 'Tambah Kategori Baru'}</h3>

            <form onSubmit={handleSubmit} className="grid-form">
              <div>
                <label>Nama Kategori</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Contoh: Pendidikan"
                />
              </div>

              <div>
                <label>Slug</label>
                <input
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  required
                  placeholder="contoh: pendidikan"
                />
              </div>

              <div className="full-field">
                <label>Deskripsi</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Tulis deskripsi singkat kategori..."
                />
              </div>

              <button className="btn btn-primary full-field">
                {editingId ? 'Simpan Perubahan' : 'Tambah Kategori'}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="btn btn-outline full-field"
                  onClick={() => {
                    resetForm();
                    setActiveView('list');
                  }}
                >
                  Batal Edit
                </button>
              )}
            </form>
          </div>
        )}

        {activeView === 'list' && (
          <div className="table-card">
            <div className="admin-section-header">
              <div>
                <span className="section-label">Daftar Kategori</span>
                <h3>List Kategori Buku</h3>
                <p>Semua kategori yang digunakan untuk mengelompokkan data buku digital dan buku fisik.</p>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Slug</th>
                  <th>Deskripsi</th>
                  <th>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan="4">Belum ada data kategori.</td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr key={category.id}>
                      <td>{category.name}</td>
                      <td>{category.slug}</td>
                      <td>{category.description || '-'}</td>
                      <td>
                        <div className="table-actions">
                          <button className="mini-btn" onClick={() => fillEdit(category)}>
                            Edit
                          </button>

                          <button className="mini-btn danger" onClick={() => handleDelete(category.id)}>
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}
