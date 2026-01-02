import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { API_URL } from "../config/config";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userAppointments, setUserAppointments] = useState([]);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  const isLoggedIn = !!user;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);

      setUser(parsed.user);
      setUserAppointments(parsed.appointments || []);
    }
    setLoadingAuth(false);
  }, []);

  const login = async (loggedUserData) => {
    try {
      const response = await axios.get(
        `${API_URL}/users/${loggedUserData.user.id}`
      );
      const appointments = response.data.appointments || [];

      setUser(loggedUserData.user);
      setUserAppointments(appointments);

      localStorage.setItem(
        "user",
        JSON.stringify({
          user: loggedUserData.user,
          appointments,
        })
      );
      setJustLoggedIn(true);
    } catch (error) {
      console.error("Error obteniendo turnos del usuario", error);
    }
  };

  const logout = () => {
    setUser(null);
    setUserAppointments([]);
    localStorage.removeItem("user");
  };

  const updateAppointments = useCallback(async () => {
    try {
      if (!user) return;

      const response = await axios.get(`${API_URL}/users/${user.id}`);
      const updatedAppointments = response.data.appointments || [];

      if (
        JSON.stringify(userAppointments) !== JSON.stringify(updatedAppointments)
      ) {
        setUserAppointments(updatedAppointments);

        const stored = localStorage.getItem("user");
        if (stored) {
          const parsed = JSON.parse(stored);
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...parsed,
              appointments: updatedAppointments,
            })
          );
        }
      }
    } catch (error) {
      console.error("Error al actualizar citas", error);
    }
  }, [user, userAppointments]);

  const updateProfileImage = (imageUrl) => {
    setUser((prevUser) => {
      const updatedUser = {
        ...prevUser,
        profile_image: imageUrl,
      };

      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...parsed,
            user: updatedUser,
          })
        );
      }

      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userAppointments,
        isLoggedIn,
        loadingAuth,
        justLoggedIn,
        updateProfileImage,
        setJustLoggedIn,
        login,
        logout,
        updateAppointments,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
