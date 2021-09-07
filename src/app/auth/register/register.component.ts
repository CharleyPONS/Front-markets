import { Component, OnInit } from '@angular/core';
import { Field, NgrxFormsFacade, SourceFormEnum } from '@core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthFacade } from '@auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public structureForm: Field[] = [
    {
      type: 'INPUT',
      name: 'email',
      placeholder: 'toto@gmail.com',
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
    {
      type: 'INPUT',
      name: 'userName',
      placeholder: 'Toto',
      validator: [Validators.required],
    },
    {
      type: 'INPUT',
      name: 'lastname',
      placeholder: 'Toto',
    },
    {
      type: 'INPUT',
      name: 'firstname',
      placeholder: 'Toto',
    },
    {
      type: 'INPUT',
      name: 'favoriteMarket',
      placeholder: 'CAC 40',
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
    this.formsFacade.setSource(SourceFormEnum.REGISTER);
    this.data$ = this.formsFacade.data$;
    this.structure$ = this.formsFacade.structure$;
  }

  updateForm(changes: any) {
    this.formsFacade.updateData(changes);
  }

  submit() {
    this.authFacade.register();
  }

  ngOnDestroy() {
    this.formsFacade.initializeForm();
  }
}
