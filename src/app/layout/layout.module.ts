import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MainLayoutComponent, NavbarComponent, FooterComponent],
  imports: [CommonModule, LayoutRoutingModule, NgbCollapseModule],
  exports: [MainLayoutComponent, NavbarComponent, FooterComponent],
})
export class LayoutModule {}
