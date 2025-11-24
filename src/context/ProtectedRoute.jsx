import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // not logged in ➝ redirect to login
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
