import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import BookDetail from "./pages/BookDetail.jsx";
import MyBorrowings from "./pages/MyBorrowings.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminBooks from "./pages/AdminBooks.jsx";
import AdminCategories from "./pages/AdminCategories.jsx";
import AdminBorrowings from "./pages/AdminBorrowings.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/:id" element={<BookDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/my-borrowings" element={<ProtectedRoute allowedRoles={["member"]}><MyBorrowings /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/books" element={<ProtectedRoute allowedRoles={["admin"]}><AdminBooks /></ProtectedRoute>} />
      <Route path="/admin/categories" element={<ProtectedRoute allowedRoles={["admin"]}><AdminCategories /></ProtectedRoute>} />
      <Route path="/admin/borrowings" element={<ProtectedRoute allowedRoles={["admin"]}><AdminBorrowings /></ProtectedRoute>} />
    </Routes>
  );
}
