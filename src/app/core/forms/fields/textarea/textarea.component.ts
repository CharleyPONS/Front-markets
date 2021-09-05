import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Field} from "../../store/ngrx-forms.interface";

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent {
  @Input() field: Field;
  @Input() group: FormGroup;
}
