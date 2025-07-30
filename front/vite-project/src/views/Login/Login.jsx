import { Formik, Field, Form, ErrorMessage } from "Formik";
import validateLogin from "../../helpers/validateLogin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import imageRegister from "../../assets/images/fondo_register.jpg";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex h-screen bg-cover bg-center font-redhat"
      style={{ backgroundImage: `url(${imageRegister})` }}
    >
      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
        <div className="flex w-[85%] h-[70%] mx-auto">
          <div className="w-1/2 flex text-gray-50 flex-col items-center justify-center p-10 bg-black shadow-2xl">
            <div className="bg-gray-50 text-black rounded-full p-6 mb-6">
              <svg
                className="w-16 h-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A4 4 0 0112 20a4 4 0 016.879-2.196M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h1 className="font-monument text-3xl text-center leading-snug">
              ESTAMOS <br /> PARA <br /> ATENDERTE
            </h1>
          </div>
          <div className="w-1/2 bg-gray-50 p-12 shadow-2xl flex flex-col justify-center">
            <h2 className="font-monument text-3xl mb-6 ">INICIAR SESIÓN</h2>
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validate={validateLogin}
              onSubmit={async (input, { resetForm }) => {
                try {
                  const response = await axios.post(
                    "http://localhost:3000/users/login",
                    input
                  );
                  alert(response.data.message || "Inicio de sesión exitoso ✅");
                  localStorage.setItem("user", JSON.stringify(response.data));
                  navigate("/turnos");
                  resetForm();
                } catch (error) {
                  const errorMsg =
                    error.response?.data?.message ||
                    "Usuario y/o Contraseña incorrectos";
                  console.error("Error al iniciar sesión:", errorMsg);
                  alert(errorMsg);
                }
              }}
            >
              {({ isValid, dirty }) => (
                <Form className="grid grid-cols-1 gap-4">
                  <div className="col-span-1">
                    <label className="block mb-1">USERNAME</label>
                    <Field
                      type="text"
                      name="username"
                      placeholder="Nombre de Usuario"
                      className="w-full border rounded px-4 py-2"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block mb-1">PASSWORD</label>
                    <Field
                      type="password"
                      name="password"
                      placeholder="********"
                      className="w-full border rounded px-4 py-2"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="col-span-1">
                    <button
                      type="submit"
                      className="w-full font-bold mt-4 bg-black text-gray-50 py-2 rounded disabled:bg-gray-50 disabled:text-black disabled: border disabled: border-black transition-all duration-200 ease-in-out"
                      disabled={!(dirty && isValid)}
                    >
                      LOGIN
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
