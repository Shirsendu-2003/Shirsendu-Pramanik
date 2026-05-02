import { Navigate } from "react-router-dom";
import { getToken } from "../utils/token";

export default function ProtectedRoute({ children }) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}