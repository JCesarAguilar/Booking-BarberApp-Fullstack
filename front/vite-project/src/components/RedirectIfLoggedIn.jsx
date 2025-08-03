import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const RedirectIfLoggedIn = ({ children }) => {
  const { user, loadingAuth, justLoggedIn } = useAuth();
  const location = useLocation();

  if (loadingAuth) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white text-2xl">
        Cargando...
      </div>
    );
  }

  if (
    user &&
    !justLoggedIn &&
    (location.pathname === "/login" || location.pathname === "/register")
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RedirectIfLoggedIn;
