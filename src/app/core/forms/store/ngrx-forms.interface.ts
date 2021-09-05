import { ValidatorFn } from '@angular/forms';
import { SourceFormEnum } from '../../model/form/source-form.enum';

export interface NgrxForms {
  data: any;
  structure: Field[];
  valid: boolean;
  touched: boolean;
  source?: SourceFormEnum;
}

export interface Field {
  type: FieldType;
  name: string;
  label?: string;
  placeholder?: string;
  validator?: ValidatorFn[];
  attrs?: any;
}

export type FieldType = 'INPUT' | 'TEXTAREA';

export interface Errors {
  [key: string]: string;
}
