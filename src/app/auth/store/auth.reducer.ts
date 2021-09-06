import { Action, createReducer, on } from '@ngrx/store';
import { User, UserRole } from '@core';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface Auth {
  loggedIn: boolean;
  user: User;
  status: Status;
}

export enum Status {
  INIT = 'INIT',
  IN_PROGRESS = 'IN_PROGRESS',
}

export const initialState: Auth = {
  loggedIn: false,
  user: {
    mail: '',
    userName: '',
    token: '',
    userRole: [new UserRole('')],
  },
  status: Status.INIT,
};

const reducer = createReducer(
  initialState,
  on(AuthActions.authenticateUserSuccess, (state, action) => ({
    ...state,
    loggedIn: true,
    user: action.user,
  })),
  on(AuthActions.getUser, (state, action) => ({
    ...state,
  })),
  on(
    AuthActions.registerUser,
    AuthActions.authenticateUser,
    (state, action) => ({
      ...state,
      status: Status.IN_PROGRESS,
    })
  ),
  on(AuthActions.registerUserSuccess, (state, action) => ({
    ...state,
    loggedIn: true,
    user: action.user,
  })),
  on(AuthActions.authenticateUserFailed, (state, action) => ({
    ...initialState,
  })),
  on(AuthActions.registerUserFailed, (state, action) => ({
    ...initialState,
  }))
);

export const authReducer = (state: Auth, action: Action): Auth => {
  return reducer(state, action);
};
