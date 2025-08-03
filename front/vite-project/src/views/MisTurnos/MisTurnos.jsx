import { useEffect } from "react";
import Turno from "../../components/Turno";
import imagenTurnos from "../../assets/images/fondo_turnos.jpg";
import { useAuth } from "../../context/useAuth";

const MisTurnos = () => {
  const { user, userAppointments, updateAppointments } = useAuth();

  useEffect(() => {
    if (user) {
      updateAppointments();
    }
  }, [user, updateAppointments, userAppointments]);

  return (
    <div
      className="min-h-[78vh]
                 bg-cover bg-center"
      style={{ backgroundImage: `url(${imagenTurnos})` }}
    >
      <div
        className="flex flex-col items-center
                  backdrop-blur bg-black/30
                  min-h-[78vh]"
      >
        <h2
          className="font-monument text-gray-50 text-4xl 
                       pt-15 md:text-5xl"
        >
          MIS RESERVAS
        </h2>
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
            <h2
              className="col-span-full pt-50
                          font-monument text-gray-50 text-xl
                          md:text-3xl"
            >
              No hay reservas para mostrar
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default MisTurnos;
