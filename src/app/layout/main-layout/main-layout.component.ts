import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthFacade } from '@auth';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  public isLoggedIn: Observable<boolean>;
  constructor(private authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authFacade.isLoggedIn$;
  }
}
