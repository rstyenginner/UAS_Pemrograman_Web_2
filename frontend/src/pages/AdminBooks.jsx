import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import { apiRequest } from '../utils/api.js';

const initialForm = {
  category_id: '',
  title: '',
  slug: '',
  author: '',
  publisher: '',
  publication_year: '',
  isbn: '',
  description: '',
  type: 'ebook',
  cover_image: '',
  pdf_file: '',
  stock_total: 0,
  stock_available: 0,
};

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [activeView, setActiveView] = useState('list');

  async function loadData() {
    const [br, cr] = await Promise.all([apiRequest('/books'), apiRequest('/categories')]);

    if (br.status) {
      setBooks(br.data || []);
    }

    if (cr.status) {
      setCategories(cr.data || []);
    }
  }

  useEffect(() => {
    loadData();
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

  function fillEdit(book) {
    setEditingId(book.id);

    setForm({
      category_id: book.category_id || '',
      title: book.title || '',
      slug: book.slug || '',
      author: book.author || '',
      publisher: book.publisher || '',
      publication_year: book.publication_year || '',
      isbn: book.isbn || '',
      description: book.description || '',
      type: book.type || 'ebook',
      cover_image: book.cover_image || '',
      pdf_file: book.pdf_file || '',
      stock_total: book.stock_total || 0,
      stock_available: book.stock_available || 0,
    });

    setActiveView('form');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...form,
      category_id: Number(form.category_id),
      publication_year: form.publication_year ? Number(form.publication_year) : null,
      stock_total: Number(form.stock_total),
      stock_available: Number(form.stock_available),
      pdf_file: form.type === 'ebook' ? form.pdf_file : null,
    };

    const result = await apiRequest(editingId ? `/books/${editingId}` : '/books', {
      method: editingId ? 'PUT' : 'POST',
      body: JSON.stringify(payload),
    });

    alert(result.message);

    if (result.status) {
      resetForm();
      loadData();
      setActiveView('list');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Yakin ingin menghapus buku ini?')) return;

    const result = await apiRequest(`/books/${id}`, {
      method: 'DELETE',
    });

    alert(result.message);

    if (result.status) {
      loadData();
    }
  }

  return (
    <>
      <Navbar />
      <main className="container">
        <div className="section-heading">
          <div>
            <span className="section-label">Admin</span>
            <h2>Kelola Buku</h2>
            <p className="muted">Tambahkan buku baru atau kelola daftar buku yang tersedia.</p>
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
              <span className="tab-icon">📚</span>
              <span>
                <strong>Daftar Buku</strong>
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
                <strong>Tambah Buku</strong>
              </span>
            </button>
          </div>
        </div>

        {activeView === 'form' && (
          <div className="form-card">
            <h3>{editingId ? 'Edit Buku' : 'Tambah Buku Baru'}</h3>

            <form onSubmit={handleSubmit} className="grid-form">
              <div>
                <label>Kategori</label>
                <select name="category_id" value={form.category_id} onChange={handleChange} required>
                  <option value="">Pilih kategori</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Jenis Buku</label>
                <select name="type" value={form.type} onChange={handleChange}>
                  <option value="ebook">E-Book</option>
                  <option value="physical">Buku Fisik</option>
                </select>
              </div>

              <div>
                <label>Judul</label>
                <input name="title" value={form.title} onChange={handleChange} required />
              </div>

              <div>
                <label>Slug</label>
                <input name="slug" value={form.slug} onChange={handleChange} required />
              </div>

              <div>
                <label>Penulis</label>
                <input name="author" value={form.author} onChange={handleChange} required />
              </div>

              <div>
                <label>Penerbit</label>
                <input name="publisher" value={form.publisher} onChange={handleChange} />
              </div>

              <div>
                <label>Tahun Terbit</label>
                <input name="publication_year" type="number" value={form.publication_year} onChange={handleChange} />
              </div>

              <div>
                <label>ISBN</label>
                <input name="isbn" value={form.isbn} onChange={handleChange} />
              </div>

              <div>
                <label>Cover Image</label>
                <input
                  name="cover_image"
                  value={form.cover_image}
                  onChange={handleChange}
                  placeholder="covers/nama-file.jpg"
                />
              </div>

              {form.type === 'ebook' && (
                <div>
                  <label>PDF File</label>
                  <input
                    name="pdf_file"
                    value={form.pdf_file}
                    onChange={handleChange}
                    placeholder="pdf/nama-file.pdf"
                    required
                  />
                </div>
              )}

              {form.type === 'physical' && (
                <>
                  <div>
                    <label>Stok Total</label>
                    <input name="stock_total" type="number" value={form.stock_total} onChange={handleChange} min="1" />
                  </div>

                  <div>
                    <label>Stok Tersedia</label>
                    <input
                      name="stock_available"
                      type="number"
                      value={form.stock_available}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                </>
              )}

              <div className="full-field">
                <label>Deskripsi</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows="3" />
              </div>

              <button className="btn btn-primary full-field">{editingId ? 'Simpan Perubahan' : 'Tambah Buku'}</button>

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
                <span className="section-label">Daftar Buku</span>
                <h3>List Buku Perpustakaan</h3>
                <p>Semua data buku digital dan buku fisik yang sudah tersimpan di database.</p>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Kategori</th>
                  <th>Jenis</th>
                  <th>Stok</th>
                  <th>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {books.length === 0 ? (
                  <tr>
                    <td colSpan="5">Belum ada data buku.</td>
                  </tr>
                ) : (
                  books.map((book) => (
                    <tr key={book.id}>
                      <td>{book.title}</td>
                      <td>{book.category_name || '-'}</td>
                      <td>
                        <span className={`status ${book.type === 'ebook' ? 'status-approved' : 'status-pending'}`}>
                          {book.type}
                        </span>
                      </td>
                      <td>{book.stock_available}</td>
                      <td>
                        <div className="table-actions">
                          <button className="mini-btn" onClick={() => fillEdit(book)}>
                            Edit
                          </button>

                          <button className="mini-btn danger" onClick={() => handleDelete(book.id)}>
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
