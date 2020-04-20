import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from '../shared/shared.module';

import { APPLICATION_ROUTE, ApplicationComponent } from './';
import { LandingComponent } from './landing/landing.component';
import { OverviewComponent } from './overview/overview.component';
import { ApplicantsComponent } from './applicants/applicants.component';
import { ApplicationSummaryComponent } from './application-summary/application-summary.component';
import { SupportingDocsComponent } from './supporting-docs/supporting-docs.component';
import { PropertyComponent } from './property/property.component';
import { PartyComponent } from './party/party.component';
import { PartyExtUpdateComponent } from './party/party-update.component';
import { SupportingExtDocumentUpdateComponent } from './ext/supporting-document/supporting-document-update.component';
import { BatchUpdateComponent } from './ext/batch/batch-update.component';
import { TranslandingComponent } from './trans-landing/trans-landing.component';
import { ParcelExtUpdateComponent } from './ext/parcel/parcel-update.component';
import { SupportingDocumentDeleteDialogComponent } from './ext/supporting-document/supporting-document-delete-dialog.component';
import { PartyDeleteDialogComponent } from './party/party-delete-dialog.component';
import { Property1Component } from './property1/property1.component';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forRoot([APPLICATION_ROUTE], { useHash: true })],
  declarations: [
    ApplicationComponent,
    LandingComponent,
    OverviewComponent,
    ApplicantsComponent,
    ApplicationSummaryComponent,
    SupportingDocsComponent,
    ApplicationSummaryComponent,
    PropertyComponent,

    Property1Component, // New one

    PartyComponent,
    BatchUpdateComponent,
    PartyExtUpdateComponent,
    SupportingExtDocumentUpdateComponent,
    TranslandingComponent,
    ParcelExtUpdateComponent,
    SupportingDocumentDeleteDialogComponent,
    PartyDeleteDialogComponent
  ],
  entryComponents: [SupportingDocumentDeleteDialogComponent, PartyDeleteDialogComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EgisexternalAppApplicationModule {}
