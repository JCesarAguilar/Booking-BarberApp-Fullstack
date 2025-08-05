import Swal from "sweetalert2";

export const useAlert = () => {
  const confirmCancel = () =>
    Swal.fire({
      title: "¿Seguro que deseas cancelar la reserva?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#28a745",
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No",
      customClass: { popup: "font-redhat" },
    });

  const successCancel = () =>
    Swal.fire({
      icon: "success",
      title: "Cancelada",
      text: "La reserva ha sido cancelada correctamente",
      confirmButtonText: "OK",
      confirmButtonColor: "#28a745",
      customClass: { popup: "font-redhat" },
    });

  const errorCancelAppointment = () =>
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo cancelar la reserva, inténtalo más tarde.",
      confirmButtonText: "OK",
      confirmButtonColor: "#d33",
      customClass: { popup: "font-redhat" },
    });

  const successRegister = () =>
    Swal.fire({
      icon: "success",
      title: "Listo",
      text: "Usuario registrado con éxito",
      confirmButtonText: "OK",
      confirmButtonColor: "#28a745",
      customClass: { popup: "font-redhat" },
    });

  const errorRegister = (errorMsg) =>
    Swal.fire({
      icon: "error",
      title: "Error",
      text: errorMsg || "Error al registrar usuario",
      confirmButtonText: "OK",
      confirmButtonColor: "#d33",
      customClass: { popup: "font-redhat" },
    });

  const successLogin = () =>
    Swal.fire({
      icon: "success",
      title: "Listo",
      text: "Inicio de sesión exitoso",
      confirmButtonText: "OK",
      confirmButtonColor: "#28a745",
      customClass: { popup: "font-redhat" },
    });

  const errorLogin = () =>
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Usuario y/o Contraseña incorrectos",
      confirmButtonText: "OK",
      confirmButtonColor: "#d33",
      customClass: { popup: "font-redhat" },
    });

  const successSchedule = () =>
    Swal.fire({
      icon: "success",
      title: "Listo",
      text: "La reserva ha sido agendada con éxito",
      confirmButtonText: "OK",
      confirmButtonColor: "#28a745",
      customClass: { popup: "font-redhat" },
    });

  const errorSchedule = () =>
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Error al agendar reserva",
      confirmButtonText: "OK",
      confirmButtonColor: "#d33",
      customClass: { popup: "font-redhat" },
    });

  return {
    confirmCancel,
    successCancel,
    errorCancelAppointment,
    successRegister,
    errorRegister,
    successLogin,
    errorLogin,
    successSchedule,
    errorSchedule,
  };
};
