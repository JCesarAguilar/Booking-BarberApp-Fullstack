import BurgerMenu from "../assets/images/BurgerMenu.png";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <ul
        className="bg-black hidden sm:flex text-[18px] text-white sm:w-[438px] sm:place-content-around sm:text-[16px] 
      sm:items-center"
      >
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/register">Registrarse</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
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
