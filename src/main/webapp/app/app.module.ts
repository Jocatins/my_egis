import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { EgisexternalSharedModule } from 'app/shared/shared.module';
import { EgisexternalCoreModule } from 'app/core/core.module';
import { EgisexternalAppRoutingModule } from './app-routing.module';
import { EgisexternalHomeAddonsModule } from './home-addons/home-addons.module';
import { EgisexternalHomeModule } from './home/home.module';
import { EgisexternalEntityModule } from './entities/entity.module';
import { EgisexternalAppApplicationModule } from './application/application.module';
import { EgisexternalAppDashboardModule } from './dashboard/dashboard.module';
import { EgisexternalAppDownloadsModule } from './downloads/downloads.module';
import { EgisexternalAppCreateAccountModule } from './create-account/create-account.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { ResourcesComponent } from './resources/resources.component';
import { PrivacypolicyComponent } from './resources/privacypolicy/privacypolicy.component';
import { CopyrightinformationComponent } from './resources/copyrightinformation/copyrightinformation.component';
import { DisclaimerComponent } from './resources/disclaimer/disclaimer.component';
import { ContactusComponent } from './resources/contactus/contactus.component';
import { RelatedinformationComponent } from './resources/subs/relatedinformation/relatedinformation.component';

@NgModule({
  imports: [
    BrowserModule,
    EgisexternalSharedModule,
    EgisexternalCoreModule,
    EgisexternalHomeModule,
    EgisexternalAppApplicationModule,
    EgisexternalAppDashboardModule,
    EgisexternalAppDownloadsModule,
    EgisexternalAppCreateAccountModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    EgisexternalEntityModule,
    EgisexternalAppRoutingModule,
    EgisexternalHomeAddonsModule
  ],
  declarations: [
    JhiMainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    ResourcesComponent,
    PrivacypolicyComponent,
    CopyrightinformationComponent,
    DisclaimerComponent,
    ContactusComponent,
    RelatedinformationComponent
  ],
  bootstrap: [JhiMainComponent]
})
export class EgisexternalAppModule {}
