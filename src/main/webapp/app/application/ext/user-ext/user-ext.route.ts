import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserExt } from 'app/shared/model/user-ext.model';
import { UserExtService } from './user-ext.service';
import { UserExtComponent } from './user-ext.component';
import { UserExtDetailComponent } from './user-ext-detail.component';
import { UserExtUpdateComponent } from './user-ext-update.component';
import { IUserExt } from 'app/shared/model/user-ext.model';

@Injectable({ providedIn: 'root' })
export class UserExtResolve implements Resolve<IUserExt> {
  constructor(private service: UserExtService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserExt> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((userExt: HttpResponse<UserExt>) => userExt.body));
    }
    return of(new UserExt());
  }
}

export const userExtRoute: Routes = [
  {
    path: '',
    component: UserExtComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.userExt.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UserExtDetailComponent,
    resolve: {
      userExt: UserExtResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.userExt.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UserExtUpdateComponent,
    resolve: {
      userExt: UserExtResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.userExt.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UserExtUpdateComponent,
    resolve: {
      userExt: UserExtResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.userExt.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
