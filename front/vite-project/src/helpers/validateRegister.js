const validateRegister = (input) => {
  const errors = {};

  const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  if (!input.name.trim()) {
    errors.name = "Nombre requerido";
  } else if (!nameRegex.test(input.name)) {
    errors.name = "Solo se permiten letras y espacios";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email.trim()) {
    errors.email = "Email requerido";
  } else if (!emailRegex.test(input.email)) {
    errors.email = "Formato de email inválido";
  }

  if (!input.birthdate.trim())
    errors.birthdate = "Fecha de nacimiento requerida";

  const dniRegex = /^\d{8}$/;
  if (!input.dni?.toString().trim()) {
    errors.dni = "DNI requerido";
  } else if (!dniRegex.test(input.dni.toString())) {
    errors.dni = "El DNI debe tener 8 dígitos";
  }

  const usernameRegex = /^[a-zA-Z0-9]+$/;
  if (!input.username.trim()) {
    errors.username = "Nombre de usuario requerido";
  } else if (!usernameRegex.test(input.username)) {
    errors.username = "Solo se permiten letras y números";
  } else if (input.username.length < 5 || input.username.length > 10) {
    errors.username = "Debe tener entre 5 y 10 caracteres";
  }

  const password = input.password || "";

  const passwordRules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]~`]/.test(password),
  };

  if (!password) {
    errors.password = "Contraseña requerida";
  } else if (
    !passwordRules.length ||
    !passwordRules.uppercase ||
    !passwordRules.number ||
    !passwordRules.special
  ) {
    errors.password = passwordRules;
  }
  return errors;
};
export default validateRegister;
