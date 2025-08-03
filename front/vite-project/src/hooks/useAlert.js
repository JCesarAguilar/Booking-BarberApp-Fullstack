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

  const errorCancel = () =>
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo cancelar la reserva, inténtalo más tarde.",
      confirmButtonText: "OK",
      confirmButtonColor: "#d33",
      customClass: { popup: "font-redhat" },
    });

  const successSchedule = () =>
    Swal.fire({
      icon: "success",
      title: "Cancelada",
      text: "La reserva ha sido agendada correctamente",
      confirmButtonText: "OK",
      confirmButtonColor: "#28a745",
      customClass: { popup: "font-redhat" },
    });

  return { confirmCancel, successCancel, errorCancel, successSchedule };
};
