import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookMarked, FolderTree, HandCoins, LayoutDashboard } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import { apiRequest } from '../utils/api.js';
export default function AdminDashboard() {
  const [stats, setStats] = useState({ books: 0, ebooks: 0, physical: 0, categories: 0, borrowings: 0 });
  useEffect(() => {
    async function loadStats() {
      const [br, cr, bor] = await Promise.all([
        apiRequest('/books'),
        apiRequest('/categories'),
        apiRequest('/borrowings'),
      ]);
      const books = br.status ? br.data || [] : [];
      const cats = cr.status ? cr.data || [] : [];
      const bors = bor.status ? bor.data || [] : [];
      setStats({
        books: books.length,
        ebooks: books.filter((i) => i.type === 'ebook').length,
        physical: books.filter((i) => i.type === 'physical').length,
        categories: cats.length,
        borrowings: bors.length,
      });
    }
    loadStats();
  }, []);
  return (
    <>
      <Navbar />
      <main className="container">
        <div className="admin-hero">
          <span className="section-label">Admin Dashboard</span>
          <h1>Panel Kendali Perpustakaan Digital</h1>
          <p>Kelola buku, kategori, dan proses peminjaman dari satu tempat.</p>
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <BookMarked />
            <strong>{stats.books}</strong>
            <span>Total Buku</span>
          </div>
          <div className="stat-card">
            <BookMarked />
            <strong>{stats.ebooks}</strong>
            <span>E-Book</span>
          </div>
          <div className="stat-card">
            <BookMarked />
            <strong>{stats.physical}</strong>
            <span>Buku Fisik</span>
          </div>
          <div className="stat-card">
            <FolderTree />
            <strong>{stats.categories}</strong>
            <span>Kategori</span>
          </div>
          <div className="stat-card">
            <HandCoins />
            <strong>{stats.borrowings}</strong>
            <span>Peminjaman</span>
          </div>
        </div>
        <div className="admin-menu">
          <Link to="/admin/books" className="admin-menu-card">
            <BookMarked />
            <h3>Kelola Buku</h3>
            <p>Tambah, edit, dan hapus data buku digital maupun fisik.</p>
          </Link>
          <Link to="/admin/categories" className="admin-menu-card">
            <FolderTree />
            <h3>Kelola Kategori</h3>
            <p>Atur kategori agar katalog buku lebih rapi.</p>
          </Link>
          <Link to="/admin/borrowings" className="admin-menu-card">
            <LayoutDashboard />
            <h3>Kelola Peminjaman</h3>
            <p>Setujui, tolak, dan tandai pengembalian buku.</p>
          </Link>
        </div>
      </main>
    </>
  );
}
