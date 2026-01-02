import axios from "axios";
import { useAuth } from "../context/useAuth";
import { useAlert } from "../hooks/useAlert";
import { API_URL } from "../config/api";

const CancelButton = ({ appointmentId, status }) => {
  const { updateAppointments } = useAuth();
  const { confirmCancel, successCancel, errorCancelAppointment } = useAlert();

  const handleCancelAppointment = async () => {
    const choice = await confirmCancel();
    if (choice.isConfirmed) {
      try {
        await axios.put(`${API_URL}/appointments/cancel/${appointmentId}`);
        updateAppointments();
        await successCancel();
      } catch (error) {
        console.error("Error al cancelar la reserva", error);
        await errorCancelAppointment();
      }
    }
  };
  return (
    <button
      onClick={handleCancelAppointment}
      className={`bg-red-700 rounded-lg hover:bg-red-600 cursor-pointer
                 py-1 px-6 w-30
                 ${status !== "active" ? "opacity-70 cursor-not-allowed" : ""}
                 `}
      disabled={status !== "active"}
    >
      Cancelar
    </button>
  );
};

export default CancelButton;
