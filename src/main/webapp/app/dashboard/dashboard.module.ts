import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from '../shared/shared.module';

import { DASHBOARD_ROUTE, DashboardComponent } from './';
import { BatchPipe } from 'app/batch.pipe';
import { ParcelResolve } from 'app/application/ext/parcel/parcel.route';
import { LoaderService } from '../interceptor/loader.service'
import { HTTP_INTERCEPTORS, } from '@angular/common/http';
import { LoaderInterceptor } from '../interceptor/loader.interceptor'


import { LoaderComponent } from '../loader/loader.component';
import { BatchComponent } from 'app/application/ext/batch/batch.component';


@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forRoot([DASHBOARD_ROUTE], { useHash: true })],
  declarations: [DashboardComponent, BatchPipe, LoaderComponent, BatchComponent],
  entryComponents: [],
  providers: [ParcelResolve,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EgisexternalAppDashboardModule {}
