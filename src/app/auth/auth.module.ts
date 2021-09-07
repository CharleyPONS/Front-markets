import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService, CoreModule } from '@core';
import { StoreModule } from '@ngrx/store';
import {
  authFeatureKey,
  authReducer,
  authInitialState,
} from './store/auth.reducer';
import { AuthFacade } from './store/auth.facade';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CoreModule,
    StoreModule.forFeature(authFeatureKey, authReducer, {
      initialState: authInitialState,
    }),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [AuthService, AuthFacade, AuthEffects],
})
export class AuthModule {}
