import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "Formik";
import { useAuth } from "../context/useAuth";
import { useAlert } from "../hooks/useAlert";
import validateApp from "../helpers/validateApp";
import { API_URL } from "../config/config";

const CreateTurno = () => {
  const { user } = useAuth();
  const { successSchedule, errorSchedule } = useAlert();

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 17; hour++) {
      slots.push(`${String(hour).padStart(2, "0")}:00`);
      if (hour < 17) slots.push(`${String(hour).padStart(2, "0")}:30`);
      if (hour === 17) slots.push("17:30"); // ⬅️ agregarlo manualmente
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div
      className="flex flex-col
                md:flex-row md:w-[50%] md:mx-auto  
                font-redhat 
                shadow-2xl shadow-black/70"
    >
      <div className="w-full md:w-1/2 items-center justify-center">
        <div
          className="aspect-square w-full h-full px-7
                      bg-gray-50 
                       flex flex-col 
                       justify-center"
        >
          <h2 className="font-monument text-2xl mb-4">Crear Reserva</h2>
          <Formik
            initialValues={{
              date: "",
              time: "",
            }}
            validate={validateApp}
            onSubmit={async (input, { resetForm }) => {
              try {
                const payload = {
                  userId: Number(user.id),
                  date: input.date,
                  time: input.time,
                };
                await axios.post(`${API_URL}/appointments/schedule`, payload);
                resetForm();
                await successSchedule();
              } catch (err) {
                console.error(err);
                await errorSchedule();
              }
            }}
          >
            {({ isValid, dirty }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block mb-1">FECHA</label>
                  <Field
                    type="date"
                    name="date"
                    className="border px-3 py-2 rounded w-full"
                  />
                  <ErrorMessage
                    name="date"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block mb-1">HORA</label>
                  <Field
                    as="select"
                    name="time"
                    className="border px-3 py-2 rounded w-full"
                  >
                    <option value="">Selecciona un horario</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="time"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!(dirty && isValid)}
                  className="w-full font-bold bg-black text-white py-2 rounded cursor-pointer disabled:bg-gray-50 disabled:text-black disabled:border disabled: border-black disabled:pointer-events-none"
                >
                  RESERVAR
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div
        className="aspect-square w-full px-7
                bg-black 
                  md:w-1/2
                  flex flex-col gap-2 
                  justify-center leading-relaxed"
      >
        <h3 className="text-gray-50 text-xl font-monument pb-2">
          Horarios de Atención
        </h3>
        <p className="flex items-center gap-2 text-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 12h16m0 0l-6-6m6 6l-6 6"
            />
          </svg>
          Lunes a viernes: 08:00 - 18:00.
        </p>
        <p className="flex items-center gap-2 text-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 12h16m0 0l-6-6m6 6l-6 6"
            />
          </svg>
          No atendemos los fines de semana.
        </p>
        <h3 className="text-gray-50 text-xl font-monument pt-4 pb-2">
          Política de reservas
        </h3>
        <p className="flex items-center gap-2 text-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 12h16m0 0l-6-6m6 6l-6 6"
            />
          </svg>
          Cada reserva dura 30 minutos..
        </p>
        <p className="flex items-center gap-2 text-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 12h16m0 0l-6-6m6 6l-6 6"
            />
          </svg>
          Reservas desde 08:00 hasta 17:30.
        </p>
        <p className="flex items-center gap-2 text-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 12h16m0 0l-6-6m6 6l-6 6"
            />
          </svg>
          Las cancelaciones solo están permitidas con más de 24 horas de
          anticipación.
        </p>
      </div>
    </div>
  );
};

export default CreateTurno;
