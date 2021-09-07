import * as NgrxFormsActions from './ngrx-forms.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { NgrxForms } from './ngrx-forms.interface';
import { SourceFormEnum } from '../../model/form/source-form.enum';

export const ngrxFormsFeatureKey = 'ngrxForms';

export interface NgrxFormsState {
  readonly [ngrxFormsFeatureKey]: NgrxForms;
}

export const ngrxFormsInitialState: NgrxForms = {
  data: {},
  structure: [],
  valid: true,
  touched: false,
};

const reducer = createReducer(
  ngrxFormsInitialState,
  on(NgrxFormsActions.setData, (state, action) => ({
    ...state,
    data: action.data,
  })),
  on(NgrxFormsActions.setSource, (state, action) => ({
    ...state,
    source: action.source,
  })),
  on(NgrxFormsActions.updateData, (state, action) => {
    const data = { ...state.data, ...action.data };
    return { ...state, data, touched: true };
  }),
  on(NgrxFormsActions.setStructure, (state, action) => ({
    ...state,
    structure: action.structure.slice(0),
  })),
  on(NgrxFormsActions.initializeForm, (state, action) => ngrxFormsInitialState),
  on(NgrxFormsActions.resetForm, (state, action) => ({
    ...state,
    touched: false,
  }))
);

export function ngrxFormsReducer(
  state: NgrxForms | undefined,
  action: Action
): NgrxForms {
  return reducer(state, action);
}
