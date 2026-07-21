import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import BookCard from '../components/BookCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { apiRequest, getUser } from '../utils/api.js';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);

  const user = getUser();

  async function loadData() {
    setLoading(true);

    const [br, cr] = await Promise.all([
      apiRequest('/books'),
      apiRequest('/categories'),
    ]);

    if (br.status) {
      setBooks(br.data || []);
    }

    if (cr.status) {
      setCategories(cr.data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const filteredBooks = useMemo(
    () =>
      books.filter((book) => {
        const q = keyword.toLowerCase();

        const matchKeyword =
          book.title?.toLowerCase().includes(q) ||
          book.author?.toLowerCase().includes(q) ||
          book.category_name?.toLowerCase().includes(q);

        const matchType = filterType === 'all' || book.type === filterType;

        const matchCategory =
          filterCategory === 'all' || String(book.category_id) === filterCategory;

        return matchKeyword && matchType && matchCategory;
      }),
    [books, filterType, filterCategory, keyword],
  );

  const totalBooks = books.length;

  const ebookCount = books.filter((book) => book.type === 'ebook').length;

  const physicalBooks = books.filter((book) => book.type === 'physical');

  const physicalCount = physicalBooks.length;

  const totalStock = physicalBooks.reduce(
    (total, book) => total + Number(book.stock_total || 0),
    0,
  );

  const availableStock = physicalBooks.reduce(
    (total, book) => total + Number(book.stock_available || 0),
    0,
  );

  const borrowedStock = totalStock - availableStock;

  const availabilityPercent =
    totalStock > 0 ? Math.round((availableStock / totalStock) * 100) : 0;

  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <h1>Temukan Buku Digital dan Ajukan Peminjaman Buku Fisik</h1>

          <p>
            Sistem manajemen buku digital dengan katalog interaktif, e-book PDF,
            peminjaman buku fisik, dan dashboard admin.
          </p>

          <div className="hero-actions">
            <a href="#catalog" className="btn btn-primary">
              Jelajahi Katalog
            </a>

            <a
              href={user?.role === 'admin' ? '/admin' : '/my-borrowings'}
              className="btn btn-glass"
            >
              {user?.role === 'admin'
                ? 'Buka Dashboard Admin'
                : 'Peminjaman Saya'}
            </a>
          </div>
        </div>

        <div className="hero-availability">
          <div className="availability-top">
            <div>
              <span className="availability-label">Ketersediaan Koleksi</span>
              <h3>Ringkasan Buku</h3>
            </div>

            <div className="availability-badge">
              {availabilityPercent}%
            </div>
          </div>

          <div className="availability-main">
            <div
              className="availability-circle"
              style={{ '--value': availabilityPercent }}
            >
              <div className="circle-inner">
                <strong>{availableStock}</strong>
                <span>stok tersedia</span>
              </div>
            </div>

            <div className="availability-info">
              <div className="info-row">
                <span>Total Stok Fisik</span>
                <strong>{totalStock}</strong>
              </div>

              <div className="info-row">
                <span>Sedang Dipinjam</span>
                <strong>{borrowedStock}</strong>
              </div>

              <div className="info-row">
                <span>Buku Fisik</span>
                <strong>{physicalCount}</strong>
              </div>
            </div>
          </div>

          <div className="availability-progress">
            <div className="progress-header">
              <span>Ketersediaan Buku Fisik</span>
              <strong>{availabilityPercent}%</strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${availabilityPercent}%` }}
              />
            </div>
          </div>

          <div className="availability-stats">
            <div className="availability-stat-card">
              <span>Total Buku</span>
              <strong>{totalBooks}</strong>
            </div>

            <div className="availability-stat-card">
              <span>E-Book</span>
              <strong>{ebookCount}</strong>
            </div>

            <div className="availability-stat-card">
              <span>Buku Fisik</span>
              <strong>{physicalCount}</strong>
            </div>
          </div>
        </div>
      </section>

      <main className="container" id="catalog">
        <div className="section-heading">
          <div>
            <span className="section-label">Katalog Buku</span>
            <h2>Daftar Koleksi Perpustakaan</h2>
          </div>

          <button className="btn btn-outline small" onClick={loadData}>
            Refresh Data
          </button>
        </div>

        <div className="filter-panel">
          <div className="search-box">
            <Search size={18} />

            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Cari judul, penulis, atau kategori..."
            />
          </div>

          <div className="filter-group">
            <SlidersHorizontal size={18} />

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">Semua Jenis</option>
              <option value="ebook">E-Book</option>
              <option value="physical">Buku Fisik</option>
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">Semua Kategori</option>

              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-card">Memuat data buku...</div>
        ) : filteredBooks.length === 0 ? (
          <EmptyState
            title="Buku tidak ditemukan"
            description="Coba gunakan kata kunci atau filter yang berbeda."
          />
        ) : (
          <div className="book-grid">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onBorrowed={loadData}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}