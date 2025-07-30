import { AppDataSource } from '../config/data-source';
import { Status } from '../dtos/AppDTO';
import { Appointment } from '../entities/AppointmentEntity';
import { getAppByIdService } from '../services/appointmentService';

const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({
  validateAllowAppointment: function (date: Date, time: string): void {
    const appointmentDate = new Date(`${date}T${time}:00`);

    const dayOfWeek = appointmentDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      throw new Error('No se pueden agendar citas los fines de semana');
    }

    const businessHours = appointmentDate.getHours();
    if (businessHours < 8 || 18 <= businessHours) {
      throw new Error('Las citas deben agendarse entre las 08:00 y las 18:00 horas');
    }

    const now = new Date();
    if (appointmentDate < now) {
      throw new Error('No se pueden agendar citas en fechas pasadas');
    }
  },

  validateAppointmentExist: async function (userId: number, date: Date, time: string): Promise<void> {
    const appointmentExist = await this.findOne({
      where: {
        user: {
          id: userId
        },
        time: time,
        date: date,
        status: Status.active
      }
    });
    if (appointmentExist) throw new Error(`La cita ya existe para el usuario con id: ${userId}`);
  },

  cancelAppointmentAllowed: async function (id: number): Promise<void> {
    const appFounded = await getAppByIdService(id);

    if (!appFounded) {
      throw new Error(`La cita con id: ${id} no fue encontrada`);
    }

    const appointmentDate = new Date(`${appFounded.date}T${appFounded.time}:00`);
    const now = new Date();

    const diffInMs = appointmentDate.getTime() - now.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 24) {
      throw new Error('Solo se puede cancelar con al menos 24 horas de anticipación');
    }

    return;
  }
});

export default AppointmentRepository;
