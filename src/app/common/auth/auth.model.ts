import { User } from '../user/user.model';

export class Authorization extends User {
  public token: string;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface RegistrationCredentials extends Credentials {
  email: string;
}
