import { BurgerMenu } from "./BurgerMenu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const NavBar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <BurgerMenu />
      <ul
        className="hidden sm:flex text-[18px] text-gray-50 sm:w-[438px] sm:place-content-around sm:text-[18px] 
      sm:items-center"
      >
        <li>
          <Link to="/" className="cursor-pointer hover:text-red-500">
            Inicio
          </Link>
        </li>
        {!isLoggedIn ? (
          <>
            <li>
              <Link
                to="/register"
                className="cursor-pointer hover:text-red-500"
              >
                Registrarse
              </Link>
            </li>
            <li>
              <Link to="/login" className="cursor-pointer hover:text-red-500">
                Login
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/schedule"
                className="cursor-pointer hover:text-red-500"
              >
                Agendar
              </Link>
            </li>
            <li>
              <Link to="/turnos" className="cursor-pointer hover:text-red-500">
                Mis Turnos
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="cursor-pointer hover:text-red-500"
              >
                Cerrar sesión
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
