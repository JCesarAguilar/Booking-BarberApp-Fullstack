import TurnForm from "../../components/TurnForm";
import imagenCrearTurnos from "../../assets/images/fondo_crearTurno.jpg";

const Shedule = () => {
  return (
    <div
      className="min-h-[78vh]
                bg-cover bg-center
                flex items-center"
      style={{ backgroundImage: `url(${imagenCrearTurnos})` }}
    >
      <div
        className="flex items-center justify-center
                  backdrop-blur bg-black/20
                  min-h-[78vh] w-full"
      >
        <TurnForm />
      </div>
    </div>
  );
};

export default Shedule;
