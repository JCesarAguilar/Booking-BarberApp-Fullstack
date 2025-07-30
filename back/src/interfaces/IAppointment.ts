import { Status } from '../dtos/AppDTO';

export interface IAppointment {
  date: Date;
  time: string;
  userId: number;
  id: number;
  status: Status;
}
