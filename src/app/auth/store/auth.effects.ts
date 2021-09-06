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
import {
  AuthService,
  JwtService,
  NgrxFormsFacade,
  SourceFormEnum,
  User,
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
      withLatestFrom(this.ngrxFormFacade.data$, this.ngrxFormFacade.source$),
      filter(([action, source]) => source === SourceFormEnum.LOGIN),
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
      filter(([action, source]) => source === SourceFormEnum.REGISTER),
      exhaustMap(([action, data]) =>
        this.authService
          .registerUser(data)
          .pipe(
            map((response: User) =>
              AuthActions.registerUserSuccess({ user: new User(response) })
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
