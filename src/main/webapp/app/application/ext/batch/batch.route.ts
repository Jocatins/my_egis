import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Route } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Batch } from 'app/shared/model/batch.model';
import { BatchService } from './batch.service';
import { BatchComponent } from './batch.component';
import { BatchDetailComponent } from './batch-detail.component';
import { BatchUpdateComponent } from './batch-update.component';
import { IBatch } from 'app/shared/model/batch.model';
import { PartyExtUpdateComponent } from '../party/party-update.component';
import { Transaction } from 'app/shared/model/transaction.model';
import { TransactionService } from 'app/entities/transaction/transaction.service';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

@Injectable({ providedIn: 'root' })
export class BatchResolve implements Resolve<IBatch> {
  constructor(private service: BatchService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBatch> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((batch: HttpResponse<Batch>) => batch.body));
    }
    return of(new Batch());
  }
}

export const batchRoute: Routes = [
  {
    path: '',
    component: BatchComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.batch.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BatchDetailComponent,
    resolve: {
      batch: BatchResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.batch.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BatchUpdateComponent,
    resolve: {
      batch: BatchResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.batch.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
