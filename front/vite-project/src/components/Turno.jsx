import CancelButton from "./CancelButton";

const Turno = ({ id, date, time, status }) => {
  return (
    <div
      className="ticket-mask 
                    relative
                    pl-14
                    w-full h-[370px]         
                    flex flex-col justify-center
                    font-redhat
                    -mt-15"
    >
      <h3 className="text-2xl font-bold mt-27 mb-4 ">Reserva #: {id}</h3>
      <div className="flex flex-col gap-2 space-y-2 text-base">
        <p>📅 Fecha: {date}</p>
        <p>⏰ Hora: {time}</p>
      </div>
      <div className="pt-7">
        <CancelButton appointmentId={id} />
      </div>
      <div className="absolute right-13 top-62 transform -translate-y-1/2">
        <p
          className={`tracking-widest rotate-180 text-[16px] uppercase ${
            status === "active" ? "text-green-600" : "text-red-600"
          }`}
          style={{ writingMode: "vertical-lr" }}
        >
          {status}
        </p>
      </div>
    </div>
  );
};

export default Turno;
