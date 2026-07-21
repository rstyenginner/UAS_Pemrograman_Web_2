import { Link, NavLink } from 'react-router-dom';
import { BookOpen, LogOut, UserRound, LayoutDashboard } from 'lucide-react';
import { getUser, isLoggedIn, logout } from '../utils/api.js';

export default function Navbar() {
  const user = getUser();

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon brand-image">
          <img src="/images/logo-perpustakaan-digital.png" alt="Logo Perpustakaan Digital" />
        </span>

        <span>Perpustakaan Digital</span>
      </Link>

      <div className="nav-links">
        <NavLink to="/">
          <BookOpen size={16} />
          Katalog
        </NavLink>

        {user?.role === 'member' && (
          <NavLink to="/my-borrowings">
            <UserRound size={16} />
            Peminjaman Saya
          </NavLink>
        )}

        {user?.role === 'admin' && (
          <NavLink to="/admin">
            <LayoutDashboard size={16} />
            Admin
          </NavLink>
        )}

        {!isLoggedIn() ? (
          <>
            <NavLink to="/login">Login</NavLink>

            <NavLink to="/register" className="nav-cta">
              Register
            </NavLink>
          </>
        ) : (
          <button className="logout-btn" onClick={logout}>
            <LogOut size={16} />
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
