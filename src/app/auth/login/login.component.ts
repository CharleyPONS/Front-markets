import { Component, OnInit } from '@angular/core';
import { Field, NgrxFormsFacade, SourceFormEnum } from '@core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthFacade } from '@auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public structureForm: Field[] = [
    {
      type: 'INPUT',
      name: 'email',
      placeholder: 'Username',
      validator: [Validators.required],
    },
    {
      type: 'INPUT',
      name: 'password',
      placeholder: 'Password',
      validator: [Validators.required],
      attrs: {
        type: 'password',
      },
    },
  ];
  public structure$: Observable<Field[]>;
  public data$: Observable<any>;
  constructor(
    private formsFacade: NgrxFormsFacade,
    private authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    this.formsFacade.setStructure(this.structureForm);
    this.formsFacade.setSource(SourceFormEnum.LOGIN);
    this.data$ = this.formsFacade.data$;
    this.structure$ = this.formsFacade.structure$;
  }

  updateForm(changes: any) {
    this.formsFacade.updateData(changes);
  }

  submit() {
    this.authFacade.login();
  }

  ngOnDestroy() {
    this.formsFacade.initializeForm();
  }
}
