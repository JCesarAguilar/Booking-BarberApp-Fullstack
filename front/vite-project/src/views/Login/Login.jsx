import { Formik, Field, Form, ErrorMessage } from "Formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useAlert } from "../../hooks/useAlert";
import validateLogin from "../../helpers/validateLogin";
import imageRegister from "../../assets/images/fondo_register.jpg";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { successLogin, errorLogin } = useAlert();

  return (
    <div
      className="min-h-[78vh]
                 bg-cover bg-center 
                 font-redhat"
      style={{ backgroundImage: `url(${imageRegister})` }}
    >
      <div
        className="flex
                 bg-black/70 min-h-[78vh]
                   items-center justify-center"
      >
        <div
          className="flex flex-col 
                      w-full h-full 
                      shadow-2xl shadow-black/70
                      md:w-[60%] md:h-100 md:flex-row"
        >
          <div
            className="bg-black w-full flex
                      text-gray-50 flex-col items-center justify-center p-10 
                        md:w-1/2"
          >
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
          <div
            className="bg-gray-50 w-full h-full p-10 
                        flex flex-col
                        md:w-1/2"
          >
            <h2 className="font-monument text-3xl mb-6">INICIAR SESIÓN</h2>
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
                  const loggedUserData = response.data;

                  await login(loggedUserData);
                  await successLogin();

                  navigate("/turnos");

                  resetForm();
                } catch (error) {
                  error.response?.data?.message ||
                    "Usuario y/o Contraseña incorrectos";
                  await errorLogin();
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
                      className="w-full font-bold mt-4 bg-black text-gray-50 py-2 rounded cursor-pointer disabled:bg-gray-50 disabled:text-black disabled: border disabled: border-black transition-all duration-200 ease-in-out disabled:pointer-events-none"
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
