import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import Turno from "../../components/Turno";
import ProfileImage from "../../components/ProfileImage.jsx";
import imagenTurnos from "../../assets/images/fondo_turnos.jpg";
import defaultProfile from "../../assets/images/user-profile-icon-free-vector.jpg";
import { API_URL } from "../../config/api.js";

const MisTurnos = () => {
  const { user, userAppointments, updateAppointments, updateProfileImage } =
    useAuth();
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (user) {
      updateAppointments();
    }
  }, [user, updateAppointments, userAppointments]);

  useEffect(() => {
    if (user?.profile_image && user.profile_image.trim() !== "") {
      setProfileImage(user.profile_image);
    } else {
      setProfileImage(defaultProfile);
    }
  }, [user]);

  const handleImageChange = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("userId", user.id);

      const { data } = await axios.post(`${API_URL}/users/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfileImage(data.imageUrl);
      updateProfileImage(data.imageUrl);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  return (
    <div
      className="min-h-[78vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${imagenTurnos})` }}
    >
      <div className="flex flex-col items-center backdrop-blur bg-black/30 min-h-[78vh]">
        <div
          className="flex justify-between items-center w-full px-8 mt-4 
        sm:grid sm:grid-cols-3 sm:items-center sm:w-full sm:px-8 sm:mt-4"
        >
          <div></div>
          <h2 className="font-monument text-gray-50 text-4xl md:text-5xl pt-2">
            MIS RESERVAS
          </h2>

          <div className="pt-6">
            <ProfileImage
              imageUrl={profileImage}
              onImageChange={handleImageChange}
            />
          </div>
        </div>
        <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center mx-auto pb-20">
          {userAppointments.length > 0 ? (
            userAppointments.map((turno) => (
              <Turno
                key={turno.id}
                id={turno.id}
                date={turno.date}
                time={turno.time}
                status={turno.status}
              />
            ))
          ) : (
            <h2 className="col-span-full pt-50 font-monument text-gray-50 text-xl md:text-3xl">
              No hay reservas para mostrar
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default MisTurnos;
