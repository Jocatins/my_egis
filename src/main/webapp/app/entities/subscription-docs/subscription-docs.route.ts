import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubscriptionDocs } from 'app/shared/model/subscription-docs.model';
import { SubscriptionDocsService } from './subscription-docs.service';
import { SubscriptionDocsComponent } from './subscription-docs.component';
import { SubscriptionDocsDetailComponent } from './subscription-docs-detail.component';
import { SubscriptionDocsUpdateComponent } from './subscription-docs-update.component';
import { ISubscriptionDocs } from 'app/shared/model/subscription-docs.model';

@Injectable({ providedIn: 'root' })
export class SubscriptionDocsResolve implements Resolve<ISubscriptionDocs> {
  constructor(private service: SubscriptionDocsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISubscriptionDocs> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((subscriptionDocs: HttpResponse<SubscriptionDocs>) => subscriptionDocs.body));
    }
    return of(new SubscriptionDocs());
  }
}

export const subscriptionDocsRoute: Routes = [
  {
    path: '',
    component: SubscriptionDocsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.subscriptionDocs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SubscriptionDocsDetailComponent,
    resolve: {
      subscriptionDocs: SubscriptionDocsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.subscriptionDocs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SubscriptionDocsUpdateComponent,
    resolve: {
      subscriptionDocs: SubscriptionDocsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.subscriptionDocs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SubscriptionDocsUpdateComponent,
    resolve: {
      subscriptionDocs: SubscriptionDocsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.subscriptionDocs.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
