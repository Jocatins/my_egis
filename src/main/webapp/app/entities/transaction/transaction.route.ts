import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction } from 'app/shared/model/transaction.model';
import { TransactionService } from './transaction.service';
import { TransactionComponent } from './transaction.component';
import { TransactionDetailComponent } from './transaction-detail.component';
import { TransactionUpdateComponent } from './transaction-update.component';
import { ITransaction } from 'app/shared/model/transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionResolve implements Resolve<ITransaction> {
  constructor(private service: TransactionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITransaction> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((transaction: HttpResponse<Transaction>) => transaction.body));
    }
    return of(new Transaction());
  }
}

export const transactionRoute: Routes = [
  {
    path: '',
    component: TransactionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.transaction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TransactionDetailComponent,
    resolve: {
      transaction: TransactionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.transaction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TransactionUpdateComponent,
    resolve: {
      transaction: TransactionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.transaction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TransactionUpdateComponent,
    resolve: {
      transaction: TransactionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.transaction.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
