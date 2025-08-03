import BurgerMenu from "../assets/images/BurgerMenu.png";
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
    <>
      <ul
        className="hidden sm:flex text-[18px] text-gray-50 sm:w-[438px] sm:place-content-around sm:text-[18px] 
      sm:items-center "
      >
        <li>
          <Link to="/">Inicio</Link>
        </li>
        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/register">Registrarse</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/schedule">Agendar</Link>
            </li>
            <li>
              <Link to="/turnos">Mis Turnos</Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-red-400 cursor-pointer"
              >
                Cerrar sesión
              </button>
            </li>
          </>
        )}
      </ul>

      <img
        className="w-10 h-10 cursor-pointer sm:hidden"
        src={BurgerMenu}
        alt="Menu Hamburguesa"
      />
    </>
  );
};

export default NavBar;
