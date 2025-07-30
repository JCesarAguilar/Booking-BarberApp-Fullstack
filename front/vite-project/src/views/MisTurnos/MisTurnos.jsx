import { useEffect, useState } from "react";
import Turno from "../../components/Turno";
import axios from "axios";
import TurnForm from "../../components/TurnForm";
import imagenTurnos from "../../assets/images/fondo_turnos.jpg";

const MisTurnos = () => {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTurnos = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?.user?.id;

      if (!userId) return;

      const response = await axios.get(`http://localhost:3000/users/${userId}`);

      const turnosUsuario = response.data.appointments || [];

      setTurnos(turnosUsuario);
    } catch (error) {
      console.error("Error al traer las reservas", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurnos();
  }, []);

  if (loading) {
    return <p>Cargando reservas...</p>;
  }

  return (
    <div
      className="bg-cover bg-center"
      style={{ backgroundImage: `url(${imagenTurnos})` }}
    >
      <div className="bg-black/10 backdrop-blur-md">
        <TurnForm onTurnoCreado={fetchTurnos} />
        <h2 className="font-monument text-center text-4xl mt-15 -mb-20 text-gray-50">
          MIS RESERVAS
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center mx-auto pb-20">
          {turnos.length > 0 ? (
            turnos.map((turno) => (
              <Turno
                key={turno.id}
                id={turno.id}
                date={turno.date}
                time={turno.time}
                status={turno.status}
              />
            ))
          ) : (
            <h2 className="font-monument text-gray-50 pt-30 text-2xl text-center col-span-full">
              No hay reservas para mostrar
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default MisTurnos;
