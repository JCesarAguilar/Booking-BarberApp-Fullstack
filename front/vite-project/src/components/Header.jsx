import logo from "../assets/images/logo.png";
import NavBar from "./Navbar";

const Header = () => {
  return (
    <header className=" bg-black flex place-content-between items-center px-6 h-[12vh] font-redhat">
      <img src={logo} alt="logo" className="w-55 md:w-65" />
      <NavBar />
    </header>
  );
};

export default Header;
