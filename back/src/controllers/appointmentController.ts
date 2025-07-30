import { Request, Response } from 'express';
import { ScheduleAppDTO } from '../dtos/AppDTO';
import { cancelAppService, getAppByIdService, getAppService, registerAppService } from '../services/appointmentService';

export const getAppointmentsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const appointments = await getAppService();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(404).json({
      message: error instanceof Error ? error.message : 'No se encontraton turnos'
    });
  }
};

export const getAppointmentByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const appointmentById = await getAppByIdService(parseInt(req.params.id, 10));
    res.status(200).json(appointmentById);
  } catch (error) {
    res.status(404).json({
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const scheduleAppointmentController = async (req: Request<unknown, unknown, ScheduleAppDTO>, res: Response): Promise<void> => {
  try {
    const scheduledAppointment = await registerAppService(req.body);
    res.status(201).json(scheduledAppointment);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'Error al agendar turno'
    });
  }
};

export const cancelAppointmentController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const cancelledAppointment = await cancelAppService(parseInt(req.params.id, 10));
    res.status(200).json(cancelledAppointment);
  } catch (error) {
    res.status(404).json({
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};
