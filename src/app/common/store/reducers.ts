import { createSelector } from 'reselect';
import { EffectsModule } from '@ngrx/effects';

import * as auth from '../auth';

export interface AppState {
  auth: auth.AuthState;
}

export const moduleReducers = [{
  reducer: { auth: auth.AuthReducer },
  actions: auth.AuthActions,
}];

export const moduleEffects = [
  EffectsModule.run(auth.AuthEffects),
];
/**
 * Function mapping the state tree into a specific state
 */
export const getAuthState = (state: AppState): auth.AuthState => state.auth;
export const getUser = createSelector(getAuthState, auth.getUser);
export const isAuthInProgress = createSelector(getAuthState, auth.getProgress);
export const getAuthError: any = createSelector(getAuthState, auth.getError);
