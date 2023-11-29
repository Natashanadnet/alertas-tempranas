import { useNavigate, useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RequireAuth({ allowedRoles }) {
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const location = useLocation();

  return isAuthenticated && usuario.RoleId === allowedRoles ? (
    <Outlet />
  ) : isAuthenticated && usuario.RoleId !== allowedRoles ? (
    <Navigate to="/acceso-denegado" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}

export default RequireAuth;
