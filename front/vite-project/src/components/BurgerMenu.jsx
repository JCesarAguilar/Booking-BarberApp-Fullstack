import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import burgerMenu from "../assets/images/BurgerMenu.png";
import close from "../assets/images/icon-menu-close.svg";

export function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="sm:hidden">
        <img
          className="w-10 h-10 cursor-pointer sm:hiddenr"
          src={burgerMenu}
          alt="Menu hamburguesa"
        />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 sm:hidden z-40"></div>
          <div className="fixed top-0 right-0 w-2/3 h-full bg-white shadow-lg p-6 z-50 sm:hidden">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-5"
            >
              <img src={close} alt="close" />
            </button>

            <nav className="mt-28 space-y-5">
              <Link to="/" className="block text-lg hover:text-red-500">
                Inicio
              </Link>

              {!isLoggedIn ? (
                <>
                  <lu className="list-none space-y-5">
                    <li>
                      <Link
                        to="/register"
                        className="block text-lg hover:text-red-500"
                      >
                        Registrarse
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/login"
                        className="block text-lg hover:text-red-500"
                      >
                        Login
                      </Link>
                    </li>
                  </lu>
                </>
              ) : (
                <>
                  <ul className="list-none space-y-5">
                    <li>
                      <Link
                        to="/schedule"
                        className="block text-lg hover:text-red-500"
                      >
                        Agendar
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/turnos"
                        className="block text-lg hover:text-red-500"
                      >
                        Mis Turnos
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block text-lg hover:text-red-500"
                      >
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </>
              )}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
