import { Authorization } from '../auth/auth.model';

export interface AuthState {
  inProgress: boolean;
  isLoggedIn: boolean;
  user?: Authorization;
  error?: object;
}

export const initialAuthState: AuthState = {
  inProgress: false,
  isLoggedIn: false,
  user: null,
  error: null
};
