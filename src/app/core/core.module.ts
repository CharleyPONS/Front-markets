import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFieldDirective } from './forms/dynamic-form/dynamic-field.directive';
import { TextareaComponent } from './forms/fields/textarea/textarea.component';
import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form.component';
import { InputComponent } from './forms/fields/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ngrxFormsFeatureKey,
  ngrxFormsInitialState,
  ngrxFormsReducer,
} from './forms/store/ngrx-forms.reducer';
import { StoreModule } from '@ngrx/store';
import { NgrxFormsFacade } from './forms/store/ngrx-forms.facade';
import { ApiService } from './services/api.service';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { JwtService } from './services/jwt.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFieldDirective,
    InputComponent,
    TextareaComponent,
  ],
  entryComponents: [InputComponent, TextareaComponent],
  exports: [DynamicFormComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forFeature(ngrxFormsFeatureKey, ngrxFormsReducer, {
      initialState: ngrxFormsInitialState,
    }),
  ],
  providers: [
    NgrxFormsFacade,
    ApiService,
    UserService,
    AuthService,
    JwtService,
  ],
})
export class CoreModule {}
