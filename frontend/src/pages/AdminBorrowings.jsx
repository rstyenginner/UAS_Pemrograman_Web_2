import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState.jsx';
import { apiRequest } from '../utils/api.js';
export default function AdminBorrowings() {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);
  async function loadBorrowings() {
    setLoading(true);
    const result = await apiRequest('/borrowings');
    if (result.status) setBorrowings(result.data || []);
    setLoading(false);
  }
  useEffect(() => {
    loadBorrowings();
  }, []);
  async function updateStatus(id, action) {
    const result = await apiRequest(`/borrowings/${id}/${action}`, { method: 'PUT' });
    alert(result.message);
    if (result.status) loadBorrowings();
  }
  return (
    <>
      <Navbar />
      <main className="container">
        <div className="section-heading">
          <div>
            <span className="section-label">Admin</span>
            <h2>Kelola Peminjaman</h2>
            <p className="muted">Kelola pengajuan peminjaman, persetujuan, penolakan, dan pengembalian buku.</p>
          </div>

          <div className="heading-actions">
            <Link to="/admin" className="btn btn-outline small">
              ← Kembali ke Dashboard
            </Link>

            <button className="btn btn-outline small" onClick={loadBorrowings}>
              Refresh
            </button>
          </div>
        </div>
        {loading ? (
          <div className="loading-card">Memuat data peminjaman...</div>
        ) : borrowings.length === 0 ? (
          <EmptyState
            title="Belum ada data peminjaman"
            description="Data akan muncul setelah member mengajukan peminjaman buku fisik."
          />
        ) : (
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Buku</th>
                  <th>Tanggal Pinjam</th>
                  <th>Jatuh Tempo</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {borrowings.map((item) => (
                  <tr key={item.id}>
                    <td>{item.member_name}</td>
                    <td>{item.book_title}</td>
                    <td>{item.borrow_date}</td>
                    <td>{item.due_date}</td>
                    <td>
                      <span className={`status status-${item.status}`}>{item.status}</span>
                    </td>
                    <td>
                      <div className="table-actions">
                        {item.status === 'pending' && (
                          <>
                            <button className="mini-btn" onClick={() => updateStatus(item.id, 'approve')}>
                              Approve
                            </button>
                            <button className="mini-btn danger" onClick={() => updateStatus(item.id, 'reject')}>
                              Reject
                            </button>
                          </>
                        )}
                        {item.status === 'approved' && (
                          <button className="mini-btn" onClick={() => updateStatus(item.id, 'return')}>
                            Return
                          </button>
                        )}
                        {['returned', 'rejected'].includes(item.status) && <span className="muted">Selesai</span>}
                      </div>
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
