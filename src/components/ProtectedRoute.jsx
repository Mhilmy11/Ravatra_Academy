import { Navigate } from "react-router";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token || token === "null" || token === "undefined") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
