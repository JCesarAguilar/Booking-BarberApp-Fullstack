import { useAuth } from "../context/useAuth";
import axios from "axios";
import { useAlert } from "../hooks/useAlert";

const CancelButton = ({ appointmentId }) => {
  const { updateAppointments } = useAuth();
  const { confirmCancel, successCancel, errorCancel } = useAlert();

  const handleCancelAppointment = async () => {
    const choice = await confirmCancel();
    if (choice.isConfirmed) {
      try {
        await axios.put(
          `http://localhost:3000/appointments/cancel/${appointmentId}`
        );
        updateAppointments();
        await successCancel();
      } catch (error) {
        console.error("Error al cancelar la reserva", error);
        await errorCancel();
      }
    }
  };
  return (
    <button
      onClick={handleCancelAppointment}
      className="bg-red-700 rounded-lg hover:bg-red-600 cursor-pointer
                 py-1 px-6 w-30"
    >
      Cancelar
    </button>
  );
};

export default CancelButton;
