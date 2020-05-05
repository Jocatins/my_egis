import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SurveyTransaction } from 'app/shared/model/survey-transaction.model';
import { SurveyTransactionService } from './survey-transaction.service';
import { SurveyTransactionComponent } from './survey-transaction.component';
import { SurveyTransactionDetailComponent } from './survey-transaction-detail.component';
import { SurveyTransactionUpdateComponent } from './survey-transaction-update.component';
import { ISurveyTransaction } from 'app/shared/model/survey-transaction.model';

@Injectable({ providedIn: 'root' })
export class SurveyTransactionResolve implements Resolve<ISurveyTransaction> {
  constructor(private service: SurveyTransactionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISurveyTransaction> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((surveyTransaction: HttpResponse<SurveyTransaction>) => surveyTransaction.body));
    }
    return of(new SurveyTransaction());
  }
}

export const surveyTransactionRoute: Routes = [
  {
    path: '',
    component: SurveyTransactionComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'egisexternalApp.surveyTransaction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SurveyTransactionDetailComponent,
    resolve: {
      surveyTransaction: SurveyTransactionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.surveyTransaction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SurveyTransactionUpdateComponent,
    resolve: {
      surveyTransaction: SurveyTransactionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.surveyTransaction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SurveyTransactionUpdateComponent,
    resolve: {
      surveyTransaction: SurveyTransactionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.surveyTransaction.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
