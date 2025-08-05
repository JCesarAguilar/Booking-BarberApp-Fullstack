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
          <Link to="/" className="cursor-pointer">
            Inicio
          </Link>
        </li>
        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/register" className="cursor-pointer">
                Registrarse
              </Link>
            </li>
            <li>
              <Link to="/login" className="cursor-pointer">
                Login
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/schedule" className="cursor-pointer">
                Agendar
              </Link>
            </li>
            <li>
              <Link to="/turnos" className="cursor-pointer">
                Mis Turnos
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-red-500 cursor-pointer"
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
