import Header from "./components/Header";
import Footer from "./components/Footer";
import MisTurnos from "./views/MisTurnos/MisTurnos";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import Shedule from "./views/Schedule/Schedule";
import { useLocation } from "react-router-dom";
import RedirectIfLoggedIn from "./components/RedirectIfLoggedIn";
import Home from "./views/Home/Home";

function App() {
  const location = useLocation();
  const rutasConLayout = ["/", "/register", "/login", "/turnos", "/schedule"];
  const hideLayout = !rutasConLayout.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={
            <RedirectIfLoggedIn>
              <Register />
            </RedirectIfLoggedIn>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectIfLoggedIn>
              <Login />
            </RedirectIfLoggedIn>
          }
        />
        <Route
          path="/turnos"
          element={
            <ProtectedRoute>
              <MisTurnos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <ProtectedRoute>
              <Shedule />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
