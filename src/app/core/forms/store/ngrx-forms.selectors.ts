import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ngrxFormsFeatureKey } from './ngrx-forms.reducer';
import { NgrxForms } from './ngrx-forms.interface';

const getNgrxForms = createFeatureSelector<NgrxForms>(ngrxFormsFeatureKey);
export const getStructure = createSelector(
  getNgrxForms,
  (state: NgrxForms) => state.structure
);
export const getData = createSelector(
  getNgrxForms,
  (state: NgrxForms) => state.data
);
export const isValid = createSelector(
  getNgrxForms,
  (state: NgrxForms) => state.valid
);
export const getTouchedForm = createSelector(
  getNgrxForms,
  (state: NgrxForms) => state.touched
);
export const getSource = createSelector(
  getNgrxForms,
  (state: NgrxForms) => state.source
);

export const ngrxFormsQuery = {
  getStructure,
  getData,
  isValid,
  getTouchedForm,
  getSource,
};
