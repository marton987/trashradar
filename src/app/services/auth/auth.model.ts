export class Authorization {
  public token: string;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface RegistrationCredentials extends Credentials {
  email: string;
}
