export interface UserRegisterDTO {
  name: string;
  email: string;
  birthdate: string;
  nDni: number;
  username: string;
  password: string;
}

export interface PublicUserResponse {
  name: string;
  email: string;
}

export interface UserLoginDTO {
  username: string;
  password: string;
}

export interface UserLoginDoneDTO {
  id: number;
  name: string;
  email: string;
  birthdate: Date;
  nDni: number;
}
