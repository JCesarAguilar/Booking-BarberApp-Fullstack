import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../hooks/useAlert";
import validateRegister from "../../helpers/validateRegister";
import imageRegister from "../../assets/images/fondo_register.jpg";
import { API_URL } from "../../config/api";

const Register = () => {
  const { successRegister, errorRegister } = useAlert();
  const navigate = useNavigate();

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
                     md:flex-row md:w-[70%] md:h-[80%]"
        >
          <div
            className="bg-black w-full
                        flex flex-col p-10
                       text-gray-50
                        items-center justify-center  
                        md:w-1/2 md:h-auto"
          >
            <h1 className="flex items-center aspect-square font-monument text-3xl text-center leading-snug">
              ESTAMOS <br /> PARA <br /> ATENDERTE
            </h1>
          </div>
          <div
            className="bg-gray-50 w-full p-8
                        flex flex-col justify-center
                        aspect-square 
                        md:w-1/2 md:p-10"
          >
            <h2 className="font-monument text-3xl mb-6">REGÍSTRATE AQUÍ</h2>
            <Formik
              initialValues={{
                name: "",
                email: "",
                birthdate: "",
                dni: "",
                username: "",
                password: "",
              }}
              validate={validateRegister}
              onSubmit={async (input, { resetForm }) => {
                try {
                  const payload = {
                    ...input,
                    nDni: Number(input.dni),
                  };
                  await axios.post(`${API_URL}/users/register`, payload);
                  await successRegister();
                  resetForm();
                  navigate("/login");
                } catch (error) {
                  const errorMsg = error.response?.data?.message;
                  console.error("Error al registrar:", errorMsg);
                  await errorRegister(errorMsg);
                }
              }}
            >
              {({ isValid, dirty }) => (
                <Form className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <label className="block mb-1">NOMBRES</label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Nombres y Apellidos"
                      className="w-full border rounded px-4 py-2"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block mb-1">EMAIL</label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="ej: usuario@dominio.com"
                      className="w-full border rounded px-4 py-2"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block mb-1">FECHA DE NACIMIENTO</label>
                    <Field
                      type="Date"
                      name="birthdate"
                      placeholder="1988-02-28"
                      className="w-full border rounded px-4 py-2"
                    />
                    <ErrorMessage
                      name="birthdate"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block mb-1">DNI</label>
                    <Field
                      type="number"
                      name="dni"
                      placeholder="ej: 45241009"
                      className="w-full border rounded px-4 py-2"
                    />
                    <ErrorMessage
                      name="dni"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block mb-1">USUARIO</label>
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
                      placeholder="Contraseña"
                      className="w-full border rounded px-4 py-2"
                    />
                    <ErrorMessage
                      name="password"
                      render={(msg) => {
                        if (typeof msg === "string") {
                          return (
                            <div className="text-red-500 text-sm mt-1">
                              {msg}
                            </div>
                          );
                        }

                        const checklist = [
                          { label: "Mínimo 8 caracteres", valid: msg.length },
                          { label: "Una mayúscula", valid: msg.uppercase },
                          { label: "Un número", valid: msg.number },
                          { label: "Un caracter especial", valid: msg.special },
                        ];

                        return (
                          <ul className="mt-2 text-sm">
                            {checklist.map((rule, idx) => (
                              <li
                                key={idx}
                                className={
                                  rule.valid ? "text-green-600" : "text-red-500"
                                }
                              >
                                {rule.valid ? "✅" : "❌"} {rule.label}
                              </li>
                            ))}
                          </ul>
                        );
                      }}
                    />
                  </div>
                  <div className="col-span-2">
                    <button
                      type="submit"
                      className="w-full font-bold mt-4 bg-black text-gray-50 py-2 rounded cursor-pointer disabled:bg-gray-50 disabled:text-black disabled:border disabled:border-black transition-all duration-200 ease-in-out disabled:pointer-events-none"
                      disabled={!(dirty && isValid)}
                    >
                      REGISTRARSE
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

export default Register;
