import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, FileText, HandCoins, Sparkles } from 'lucide-react';
import { apiRequest, assetUrl, getUser, isLoggedIn } from '../utils/api.js';

export default function BookCard({ book, onBorrowed }) {
  const navigate = useNavigate();
  const isEbook = book.type === 'ebook';
  async function handleBorrow() {
    if (!isLoggedIn()) {
      alert('Silakan login sebagai member untuk meminjam buku.');
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
    if (result.status && onBorrowed) onBorrowed();
  }
  return (
    <article className="book-card">
      <div className="book-cover">
        {book.cover_image ? (
          <img
            src={assetUrl(book.cover_image)}
            alt={book.title}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className="cover-fallback" style={{ display: book.cover_image ? 'none' : 'flex' }}>
          <Sparkles size={28} />
          <span>{book.title?.slice(0, 2).toUpperCase()}</span>
        </div>
      </div>
      <div className="book-body">
        <div className="book-badges">
          <span className={isEbook ? 'badge badge-ebook' : 'badge badge-physical'}>
            {isEbook ? 'E-Book' : 'Buku Fisik'}
          </span>
          {book.category_name && <span className="badge badge-soft">{book.category_name}</span>}
        </div>
        <h3>{book.title}</h3>
        <p className="muted">oleh {book.author || '-'}</p>
        <p className="book-desc">{book.description || 'Deskripsi buku belum tersedia.'}</p>
        <div className="book-meta">
          <span>Stok: {book.stock_available ?? 0}</span>
          <span>{book.publication_year || '-'}</span>
        </div>
        <div className="card-actions">
          <Link to={`/books/${book.id}`} className="btn btn-outline">
            <BookOpen size={16} />
            Detail
          </Link>
          {isEbook ? (
            <a href={assetUrl(book.pdf_file)} target="_blank" className="btn btn-primary">
              <FileText size={16} />
              Baca PDF
            </a>
          ) : (
            <button className="btn btn-primary" onClick={handleBorrow}>
              <HandCoins size={16} />
              Pinjam
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
