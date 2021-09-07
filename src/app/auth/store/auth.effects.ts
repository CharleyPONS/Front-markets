import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import {
  filter,
  exhaustMap,
  map,
  switchMap,
  withLatestFrom,
  catchError,
  tap,
} from 'rxjs/operators';
import { of } from 'rxjs';

import {
  AuthService,
  JwtService,
  NgrxFormsFacade,
  SourceFormEnum,
  User,
  UserRole,
  UserService,
} from '@core';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private ngrxFormFacade: NgrxFormsFacade,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  public getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUser),
      switchMap((action) =>
        this.userService
          .getUser()
          .pipe(
            map((user: User) =>
              AuthActions.authenticateUserSuccess({ user: new User(user) })
            )
          )
      )
    )
  );
  public authenticateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.authenticateUser),
      tap((action) => console.log(action)),
      withLatestFrom(this.ngrxFormFacade.data$, this.ngrxFormFacade.source$),
      tap((data) => console.log(data)),
      filter(([action, data, source]) => source === SourceFormEnum.LOGIN),
      exhaustMap(([action, data]) =>
        this.authService
          .authenticateUser(data)
          .pipe(
            map((response: User) =>
              AuthActions.authenticateUserSuccess({ user: new User(response) })
            )
          )
      )
    )
  );
  public registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerUser),
      withLatestFrom(this.ngrxFormFacade.data$, this.ngrxFormFacade.source$),
      tap((data) => console.log('ARRAY OF STREAM', data)),
      filter(([action, data, source]) => source === SourceFormEnum.REGISTER),
      exhaustMap(([action, data]) =>
        this.authService.registerUser(data).pipe(
          map((response: User) =>
            AuthActions.registerUserSuccess({
              user: new User({ ...response, userRole: [new UserRole('USER')] }),
            })
          )
        )
      )
    )
  );

  public loginOrRegisterSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AuthActions.authenticateUserSuccess,
        AuthActions.registerUserSuccess
      ),
      tap((action) => {
        this.jwtService.setItem(action.user.token);
      })
    )
  );
}
