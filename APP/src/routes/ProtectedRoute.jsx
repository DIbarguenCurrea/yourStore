import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/authService";

// ProtectedRoute, sirve para proteger las rutas, si el user no está autenticado, se redirige a la página de login

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return children;
}
