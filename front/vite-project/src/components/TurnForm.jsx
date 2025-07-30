import { Formik, Form, Field, ErrorMessage } from "Formik";
import axios from "axios";
import validateApp from "../helpers/validateApp";

const CreateTurno = ({ onTurnoCreado }) => {
  return (
    <div className="flex w-[50%] mx-auto pt-20 font-redhat shadow-2xl shadow-black/40">
      <div className="w-1/2 items-center justify-center">
        <div className="aspect-square w-full p-6 bg-gray-50 flex flex-col justify-center">
          <h2 className="font-monument text-2xl mb-4">Crear Turno</h2>

          <Formik
            initialValues={{
              date: "",
              time: "",
            }}
            validate={validateApp}
            onSubmit={async (input, { resetForm }) => {
              try {
                const storedUser = JSON.parse(localStorage.getItem("user"));
                const userId = storedUser?.user.id;

                if (!userId) {
                  alert("Debes iniciar sesión para crear un turno");
                  return;
                }

                const payload = {
                  userId: Number(userId),
                  date: input.date,
                  time: input.time,
                };

                const response = await axios.post(
                  "http://localhost:3000/appointments/schedule",
                  payload
                );

                alert(response.data.message || "Turno creado con éxito ✅");
                resetForm();

                if (onTurnoCreado) {
                  onTurnoCreado();
                }
              } catch (err) {
                console.error(err);
                alert(
                  err.response?.data?.message || "Error al crear el turno ❌"
                );
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
                    type="time"
                    name="time"
                    className="border px-3 py-2 rounded w-full"
                  />
                  <ErrorMessage
                    name="time"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!(dirty && isValid)}
                  className="w-full font-bold bg-black text-white py-2 rounded disabled:bg-gray-50 disabled:text-black disabled:border disabled: border-black"
                >
                  RESERVAR
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="bg-black w-1/2 p-6 flex flex-col gap-2 justify-center leading-relaxed">
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
        <h3 className="text-gray-50 text-xl font-monument pt-8 pb-2">
          Política de cancelación de reservas
        </h3>
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
          Las reservas solo pueden ser canceladas con un mínimo de 24 horas de
          antelación.
        </p>
      </div>
    </div>
  );
};

export default CreateTurno;
