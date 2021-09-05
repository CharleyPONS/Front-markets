import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFieldDirective } from './dynamic-form/dynamic-field.directive';
import { TextareaComponent } from './fields/textarea/textarea.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { InputComponent } from './fields/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ngrxFormsFeatureKey,
  ngrxFormsInitialState,
  ngrxFormsReducer,
} from './store/ngrx-forms.reducer';
import { StoreModule } from '@ngrx/store';

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
    ReactiveFormsModule,
    StoreModule.forFeature(ngrxFormsFeatureKey, ngrxFormsReducer, {
      initialState: ngrxFormsInitialState,
    }),
  ],
})
export class FormsModule {}
