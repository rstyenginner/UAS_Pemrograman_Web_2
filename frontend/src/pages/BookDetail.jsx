import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, FileText, HandCoins } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import { apiRequest, assetUrl, getUser, isLoggedIn } from '../utils/api.js';
export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  async function loadBook() {
    const result = await apiRequest(`/books/${id}`);
    if (result.status) setBook(result.data);
    setLoading(false);
  }
  useEffect(() => {
    loadBook();
  }, [id]);
  async function handleBorrow() {
    if (!isLoggedIn()) {
      alert('Silakan login terlebih dahulu.');
      navigate('/login');
      return;
    }
    const user = getUser();
    if (user.role !== 'member') {
      alert('Hanya member yang dapat mengajukan peminjaman.');
      return;
    }
    const today = new Date();
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + 7);
    const result = await apiRequest('/borrowings', {
      method: 'POST',
      body: JSON.stringify({
        book_id: book.id,
        borrow_date: today.toISOString().split('T')[0],
        due_date: dueDate.toISOString().split('T')[0],
      }),
    });
    alert(result.message);
  }
  return (
    <>
      <Navbar />
      <main className="container">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} />
          Kembali ke katalog
        </Link>
        {loading ? (
          <div className="loading-card">Memuat detail buku...</div>
        ) : !book ? (
          <div className="empty-state">Buku tidak ditemukan.</div>
        ) : (
          <section className="detail-layout">
            <div className="detail-cover">
              {book.cover_image ? (
                <img src={assetUrl(book.cover_image)} alt={book.title} />
              ) : (
                <div className="cover-fallback large">{book.title?.slice(0, 2).toUpperCase()}</div>
              )}
            </div>
            <div className="detail-content">
              <span className={book.type === 'ebook' ? 'badge badge-ebook' : 'badge badge-physical'}>
                {book.type === 'ebook' ? 'E-Book Digital' : 'Buku Fisik'}
              </span>
              <h1>{book.title}</h1>
              <p className="muted">Ditulis oleh {book.author || '-'}</p>
              <div className="detail-table">
                <div>
                  <strong>Kategori</strong>
                  <span>{book.category_name || '-'}</span>
                </div>
                <div>
                  <strong>Penerbit</strong>
                  <span>{book.publisher || '-'}</span>
                </div>
                <div>
                  <strong>Tahun</strong>
                  <span>{book.publication_year || '-'}</span>
                </div>
                <div>
                  <strong>ISBN</strong>
                  <span>{book.isbn || '-'}</span>
                </div>
                <div>
                  <strong>Stok</strong>
                  <span>{book.stock_available ?? 0}</span>
                </div>
              </div>
              <h3>Deskripsi</h3>
              <p>{book.description || 'Deskripsi belum tersedia.'}</p>
              {book.type === 'ebook' ? (
                <a href={assetUrl(book.pdf_file)} target="_blank" className="btn btn-primary fit">
                  <FileText size={18} />
                  Baca PDF
                </a>
              ) : (
                <button className="btn btn-primary fit" onClick={handleBorrow}>
                  <HandCoins size={18} />
                  Ajukan Peminjaman
                </button>
              )}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
