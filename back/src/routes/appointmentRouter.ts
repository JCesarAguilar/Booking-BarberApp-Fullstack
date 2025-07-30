import { Request, Response, Router } from 'express';
import { getAppointmentsController, getAppointmentByIdController, scheduleAppointmentController, cancelAppointmentController } from '../controllers/appointmentController';
import { ScheduleAppDTO } from '../dtos/AppDTO';
import { validateIdParam } from '../middlewares/validateIdParam';

const appointmentRouter: Router = Router();

appointmentRouter.get('/', (req: Request, res: Response): Promise<void> => getAppointmentsController(req, res));
appointmentRouter.get('/:id', validateIdParam, (req: Request, res: Response): Promise<void> => getAppointmentByIdController(req, res));
appointmentRouter.post('/schedule', (req: Request<unknown, unknown, ScheduleAppDTO>, res: Response): Promise<void> => scheduleAppointmentController(req, res));
appointmentRouter.put('/cancel/:id', (req: Request<{ id: string }>, res: Response): Promise<void> => cancelAppointmentController(req, res));

export default appointmentRouter;
