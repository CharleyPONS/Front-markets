import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from '@auth';
import { CoreModule } from '@core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [MainLayoutComponent, NavbarComponent, FooterComponent],
  imports: [
    CommonModule,
    NgbCollapseModule,
    AuthModule,
    CoreModule,
    RouterModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  exports: [MainLayoutComponent, NavbarComponent, FooterComponent],
})
export class LayoutModule {}
