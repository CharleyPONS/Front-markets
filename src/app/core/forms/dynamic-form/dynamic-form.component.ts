import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, takeUntil, tap, filter } from 'rxjs/operators';
import { Field } from '../store/ngrx-forms.interface';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  @Input() structure$: Observable<Field[]>;
  @Input() data$: Observable<any>;
  @Input() touchedForm$: Observable<boolean>;
  @Output() updateForm: EventEmitter<any> = new EventEmitter();
  unsubscribe$: Subject<void> = new Subject();
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.structure$
      .pipe(
        map((structure) => this.formBuilder(structure)),
        tap((f) => (this.form = f)),
        tap((f) => this.listenFormChanges(f)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((f) => this.patchValue(f, this.data$));

    if (this.touchedForm$) {
      this.touchedForm$
        .pipe(
          filter((t) => !t && !!this.form),
          takeUntil(this.unsubscribe$)
        )
        .subscribe((_) => this.form.reset());
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private formBuilder = (structure: Field[]): FormGroup => {
    const group = this.fb.group({});
    structure.forEach((field) =>
      group.addControl(field.name, this.control(field))
    );
    return group;
  };

  private control = (field: Field): FormControl => {
    return this.fb.control('', field.validator);
  };

  private patchValue = (form: FormGroup, data: Observable<any>) => {
    !!data
      ? form.patchValue(data, { emitEvent: false })
      : form.patchValue({}, { emitEvent: false });
  };

  private listenFormChanges(form: FormGroup) {
    form.valueChanges
      .pipe(
        debounceTime(100),
        tap((f) => this.patchValue(f, this.data$)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((changes: any) => {
        console.log(changes);
        this.updateForm.emit(changes);
      });
  }
}
