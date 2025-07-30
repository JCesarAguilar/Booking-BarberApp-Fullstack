import { ScheduleAppDTO, Status } from '../dtos/AppDTO';
import { getUserByIdService } from './userService';
import AppointmentRepository from '../repositories/AppointmentRepository';
import { Appointment } from '../entities/AppointmentEntity';

export const getAppService = async (): Promise<Appointment[]> => {
  const appointmentList = await AppointmentRepository.find();
  if (appointmentList.length === 0) throw new Error('no se encontraron turnos');
  else return appointmentList;
};

export const getAppByIdService = async (id: number): Promise<Appointment | null> => {
  const appFounded = await AppointmentRepository.findOne({ where: { id } });
  if (!appFounded) throw new Error(`La cita con id: ${id} no fue encontrada`);
  else return appFounded;
};

export const registerAppService = async (appointment: ScheduleAppDTO): Promise<ScheduleAppDTO> => {
  const user = await getUserByIdService(appointment.userId);
  AppointmentRepository.validateAllowAppointment(appointment.date, appointment.time);
  await AppointmentRepository.validateAppointmentExist(appointment.userId, appointment.date, appointment.time);
  const newAppointment: Appointment = AppointmentRepository.create({
    date: appointment.date,
    time: appointment.time,
    user
  });
  await AppointmentRepository.save(newAppointment);
  return {
    date: newAppointment.date,
    time: newAppointment.time,
    userId: newAppointment.user.id
  };
};

export const cancelAppService = async (id: number): Promise<Appointment> => {
  await AppointmentRepository.cancelAppointmentAllowed(id);
  const appFounded = await getAppByIdService(id);
  if (!appFounded) {
    throw new Error(`La cita con id: ${id} no fue encontrada`);
  }

  AppointmentRepository.cancelAppointmentAllowed(id);

  appFounded.status = Status.cancelled;
  await AppointmentRepository.save(appFounded);
  return appFounded;
};
