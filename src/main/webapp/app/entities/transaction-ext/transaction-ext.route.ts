import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransactionExt } from 'app/shared/model/transaction-ext.model';
import { TransactionExtService } from './transaction-ext.service';
import { TransactionExtComponent } from './transaction-ext.component';
import { TransactionExtDetailComponent } from './transaction-ext-detail.component';
import { TransactionExtUpdateComponent } from './transaction-ext-update.component';
import { ITransactionExt } from 'app/shared/model/transaction-ext.model';

@Injectable({ providedIn: 'root' })
export class TransactionExtResolve implements Resolve<ITransactionExt> {
  constructor(private service: TransactionExtService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITransactionExt> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((transactionExt: HttpResponse<TransactionExt>) => transactionExt.body));
    }
    return of(new TransactionExt());
  }
}

export const transactionExtRoute: Routes = [
  {
    path: '',
    component: TransactionExtComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.transactionExt.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TransactionExtDetailComponent,
    resolve: {
      transactionExt: TransactionExtResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.transactionExt.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TransactionExtUpdateComponent,
    resolve: {
      transactionExt: TransactionExtResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.transactionExt.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TransactionExtUpdateComponent,
    resolve: {
      transactionExt: TransactionExtResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.transactionExt.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
