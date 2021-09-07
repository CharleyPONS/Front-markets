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

export const authInitialState: Auth = {
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
  authInitialState,
  on(AuthActions.authenticateUserSuccess, (state, action) => ({
    ...state,
    loggedIn: true,
    user: action.user,
  })),
  on(AuthActions.getUser, (state, _) => ({
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
    ...authInitialState,
  })),
  on(AuthActions.registerUserFailed, (state, action) => ({
    ...authInitialState,
  }))
);

export const authReducer = (state: Auth | undefined, action: Action): Auth => {
  return reducer(state, action);
};
