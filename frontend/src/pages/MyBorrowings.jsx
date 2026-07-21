import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { apiRequest } from '../utils/api.js';
export default function MyBorrowings() {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);
  async function loadBorrowings() {
    setLoading(true);
    const result = await apiRequest('/my-borrowings');
    if (result.status) setBorrowings(result.data || []);
    setLoading(false);
  }
  useEffect(() => {
    loadBorrowings();
  }, []);
  return (
    <>
      <Navbar />
      <main className="container">
        <div className="section-heading">
          <div>
            <span className="section-label">Member Area</span>
            <h2>Riwayat Peminjaman Saya</h2>
          </div>
          <div className="heading-actions">
            <Link to="/" className="btn btn-outline small">
              ← Kembali ke Katalog
            </Link>

            <button className="btn btn-outline small" onClick={loadBorrowings}>
              Refresh
            </button>
          </div>
        </div>
        {loading ? (
          <div className="loading-card">Memuat riwayat peminjaman...</div>
        ) : borrowings.length === 0 ? (
          <EmptyState
            title="Belum ada peminjaman"
            description="Silakan pilih buku fisik dari katalog untuk mengajukan peminjaman."
          />
        ) : (
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Buku</th>
                  <th>Tipe</th>
                  <th>Tanggal Pinjam</th>
                  <th>Jatuh Tempo</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {borrowings.map((item) => (
                  <tr key={item.id}>
                    <td>{item.book_title}</td>
                    <td>{item.book_type}</td>
                    <td>{item.borrow_date}</td>
                    <td>{item.due_date}</td>
                    <td>
                      <span className={`status status-${item.status}`}>{item.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}
