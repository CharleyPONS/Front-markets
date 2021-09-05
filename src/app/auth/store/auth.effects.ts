import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import {
  filter,
  exhaustMap,
  map,
  withLatestFrom,
  catchError,
} from 'rxjs/operators';
import { AuthService, NgrxFormsFacade, SourceFormEnum, User } from '../../core';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    public ngrxFormFacade: NgrxFormsFacade
  ) {}
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
}
