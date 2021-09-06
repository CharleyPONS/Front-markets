import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { authQuery } from './auth.selectors';
import * as AuthActions from './auth.actions';
import { Auth } from './auth.reducer';

@Injectable()
export class AuthFacade {
  auth$ = this.store.select(authQuery.getAuth);
  user$ = this.store.select(authQuery.getUser);
  isLoggedIn$ = this.store.select(authQuery.getLoggedIn);

  constructor(private store: Store<{ authFeatureKey: Auth }>) {}

  login() {
    this.store.dispatch(AuthActions.authenticateUser());
  }

  register() {
    this.store.dispatch(AuthActions.registerUser());
  }

  user() {
    this.store.dispatch(AuthActions.getUser());
  }
}
