import { createAction, props } from '@ngrx/store';
import { User } from '@core';

export const getUser = createAction('[Auth] GET_USER');
export const authenticateUser = createAction('[Auth] AUTHENTICATE_USER');
export const authenticateUserSuccess = createAction(
  '[Auth] AUTHENTICATE_USER_SUCCESS',
  props<{ user: User }>()
);
export const authenticateUserFailed = createAction(
  '[Auth] AUTHENTICATE_USER_FAILED',
  props<{ error: any }>()
);
export const registerUser = createAction('[Auth] REGISTER_USER');
export const registerUserSuccess = createAction(
  '[Auth] REGISTER_USER_SUCCESS',
  props<{ user: User }>()
);
export const registerUserFailed = createAction(
  '[Auth] REGISTER_USER_FAILED',
  props<{ error: any }>()
);
