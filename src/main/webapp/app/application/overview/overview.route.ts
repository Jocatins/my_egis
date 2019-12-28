import { Route, ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { OverviewComponent } from './overview.component';
import { IBatch, Batch } from 'app/shared/model/batch.model';
import { Observable, of } from 'rxjs';
import { BatchService } from 'app/entities/batch/batch.service';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BatchExtResolve implements Resolve<IBatch> {
  constructor(private service: BatchService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBatch> {
    const id = route.params['id'];
    alert(id);

    if (id) {
      return this.service.find(id).pipe(map((batch: HttpResponse<Batch>) => batch.body));
    }
    return of(new Batch());
  }
}

export const OVERVIEW: Route = {
  path: 'overview/:transCode',
  component: OverviewComponent,
  data: {
    authorities: [],
    pageTitle: 'overview.title'
  },
  canActivate: [UserRouteAccessService]
};
