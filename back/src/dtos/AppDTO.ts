export enum Status {
  active = 'active',
  cancelled = 'cancelled'
}

export interface ScheduleAppDTO {
  date: Date;
  time: string;
  userId: number;
}
