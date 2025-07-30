const validateLogin = (input) => {
  const errors = {};

  if (!input.username.trim()) {
    errors.username = "Nombre de usuario requerido";
  }

  if (!input.password) {
    errors.password = "Contraseña requerida";
  }

  return errors;
};

export default validateLogin;
