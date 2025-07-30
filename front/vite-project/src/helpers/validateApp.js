const validateApp = (input) => {
  const errors = {};
  const today = new Date().toISOString().split("T")[0];
  if (!input.date) {
    errors.date = "La fecha es requerida";
  } else if (input.date < today) {
    errors.date = "No puedes elegir una fecha pasada";
  }
  if (!input.time) errors.time = "La hora es requerida";

  return errors;
};

export default validateApp;
