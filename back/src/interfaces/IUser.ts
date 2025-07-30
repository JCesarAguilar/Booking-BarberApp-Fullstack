export interface IUser {
  id: number;
  name: string;
  email: string;
  birthdate: Date;
  nDni: number;
  credentialsId: number;
  //Extra:
  profile_image?: string;
}
