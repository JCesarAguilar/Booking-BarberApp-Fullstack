import Header from "./components/Header";
import MainArticle from "./components/MainArticle";
import Footer from "./components/Footer";
import MisTurnos from "./views/MisTurnos/MisTurnos";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainArticle />} />
        <Route path="/turnos" element={<MisTurnos />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
