import logo from "../assets/images/logo.png";
import NavBar from "./Navbar";

const Header = () => {
  return (
    <header className="bg-black flex place-content-between items-center px-6 h-24 font-redhat">
      <img src={logo} alt="logo" className="w-65" />
      <NavBar />
    </header>
  );
};

export default Header;
