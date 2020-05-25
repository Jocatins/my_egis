import { Route, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ApplicationSummaryComponent } from './application-summary.component';
import { IBatch, Batch } from 'app/shared/model/batch.model';
import { BatchService } from '../ext/batch/batch.service';
import { Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { DashboardService } from 'app/dashboard/dashboard.service';

@Injectable({ providedIn: 'root' })
export class BatchResolve implements Resolve<IBatch> {
  constructor(private service: BatchService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBatch> {
    const id = route.params['batchId'];
    if (id) {
      return this.service.find(id).pipe(map((batch: HttpResponse<Batch>) => batch.body));
    }
    return of(new Batch());
  }
}

export const APPLICATION_SUMMARY: Route = {
  path: 'application-summary/:batchId',
  component: ApplicationSummaryComponent,
  resolve: {
    batch: BatchResolve
  },
  data: {
    authorities: [],
    pageTitle: 'application-summary.title'
  },
  canActivate: [UserRouteAccessService]
};
