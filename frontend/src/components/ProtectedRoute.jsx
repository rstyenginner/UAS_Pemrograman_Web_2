import { Navigate } from "react-router-dom";
import { getUser, isLoggedIn } from "../utils/api.js";

export default function ProtectedRoute({ children, allowedRoles }) {
  const user = getUser();
  if (!isLoggedIn()) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user?.role)) return <Navigate to="/" replace />;
  return children;
}
