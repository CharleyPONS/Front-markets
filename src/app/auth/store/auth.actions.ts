import { createAction, props } from '@ngrx/store';
import { User } from '../../core/model/user/user';

export const authenticateUser = createAction('[Auth] Load Auths');

export const authenticateUserSuccess = createAction(
  '[Auth] Load Auths Success',
  props<{ user: User }>()
);

export const authenticateUserFailed = createAction(
  '[Auth] Load Auths Failure',
  props<{ error: any }>()
);

export const registerUser = createAction('[Auth] Load Auths');

export const registerUserSuccess = createAction(
  '[Auth] Load Auths Success',
  props<{ user: User }>()
);

export const registerUserFailed = createAction(
  '[Auth] Load Auths Failure',
  props<{ error: any }>()
);
