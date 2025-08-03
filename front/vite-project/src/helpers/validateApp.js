const validateApp = (input) => {
  const errors = {};
  const today = new Date().toISOString().split("T")[0];

  if (!input.date) {
    errors.date = "La fecha es requerida";
  } else if (input.date < today) {
    errors.date = "No puedes elegir una fecha pasada";
  } else {
    const dayOfWeek = new Date(input.date).getDay();
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      errors.date = "Solo atendemos de lunes a viernes";
    }
  }

  if (!input.time) {
    errors.time = "La hora es requerida";
  } else {
    const [hours, minutes] = input.time.split(":").map(Number);
    if (hours < 8 || (hours >= 18 && minutes > 0)) {
      errors.time = "El horario de atención es de 08:00 a 18:00";
    }
    if (minutes % 30 !== 0) {
      errors.time = "La hora debe estar en intervalos de 30 minutos";
    }
  }

  return errors;
};

export default validateApp;
