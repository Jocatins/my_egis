import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { YearSubscription } from 'app/shared/model/year-subscription.model';
import { YearSubscriptionService } from './year-subscription.service';
import { YearSubscriptionComponent } from './year-subscription.component';
import { YearSubscriptionDetailComponent } from './year-subscription-detail.component';
import { YearSubscriptionUpdateComponent } from './year-subscription-update.component';
import { IYearSubscription } from 'app/shared/model/year-subscription.model';

@Injectable({ providedIn: 'root' })
export class YearSubscriptionResolve implements Resolve<IYearSubscription> {
  constructor(private service: YearSubscriptionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IYearSubscription> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((yearSubscription: HttpResponse<YearSubscription>) => yearSubscription.body));
    }
    return of(new YearSubscription());
  }
}

export const yearSubscriptionRoute: Routes = [
  {
    path: '',
    component: YearSubscriptionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.yearSubscription.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: YearSubscriptionDetailComponent,
    resolve: {
      yearSubscription: YearSubscriptionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.yearSubscription.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: YearSubscriptionUpdateComponent,
    resolve: {
      yearSubscription: YearSubscriptionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.yearSubscription.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: YearSubscriptionUpdateComponent,
    resolve: {
      yearSubscription: YearSubscriptionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.yearSubscription.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
