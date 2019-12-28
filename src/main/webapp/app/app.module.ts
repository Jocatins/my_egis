import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { EgisexternalSharedModule } from 'app/shared/shared.module';
import { EgisexternalCoreModule } from 'app/core/core.module';
import { EgisexternalAppRoutingModule } from './app-routing.module';
import { EgisexternalHomeModule } from './home/home.module';
import { EgisexternalEntityModule } from './entities/entity.module';
import { EgisexternalAppApplicationModule } from './application/application.module';
import { EgisexternalAppDashboardModule } from './dashboard/dashboard.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';


@NgModule({
  imports: [
    BrowserModule,
    EgisexternalSharedModule,
    EgisexternalCoreModule,
    EgisexternalHomeModule,
    EgisexternalAppApplicationModule,
    EgisexternalAppDashboardModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    EgisexternalEntityModule,
    EgisexternalAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class EgisexternalAppModule {}
