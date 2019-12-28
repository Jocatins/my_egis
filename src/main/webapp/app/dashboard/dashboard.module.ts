import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from '../shared/shared.module';

import { DASHBOARD_ROUTE, DashboardComponent } from './';
import { BatchPipe } from 'app/batch.pipe';
import { ParcelResolve } from 'app/application/ext/parcel/parcel.route';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forRoot([DASHBOARD_ROUTE], { useHash: true })],
  declarations: [DashboardComponent, BatchPipe],
  entryComponents: [],
  providers: [ParcelResolve],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EgisexternalAppDashboardModule {}
