import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TitleSelectOptions } from 'app/shared/model/title-select-options.model';
import { TitleSelectOptionsService } from './title-select-options.service';
import { TitleSelectOptionsComponent } from './title-select-options.component';
import { TitleSelectOptionsDetailComponent } from './title-select-options-detail.component';
import { TitleSelectOptionsUpdateComponent } from './title-select-options-update.component';
import { ITitleSelectOptions } from 'app/shared/model/title-select-options.model';

@Injectable({ providedIn: 'root' })
export class TitleSelectOptionsResolve implements Resolve<ITitleSelectOptions> {
  constructor(private service: TitleSelectOptionsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITitleSelectOptions> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((titleSelectOptions: HttpResponse<TitleSelectOptions>) => titleSelectOptions.body));
    }
    return of(new TitleSelectOptions());
  }
}

export const titleSelectOptionsRoute: Routes = [
  {
    path: '',
    component: TitleSelectOptionsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.titleSelectOptions.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TitleSelectOptionsDetailComponent,
    resolve: {
      titleSelectOptions: TitleSelectOptionsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.titleSelectOptions.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TitleSelectOptionsUpdateComponent,
    resolve: {
      titleSelectOptions: TitleSelectOptionsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.titleSelectOptions.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TitleSelectOptionsUpdateComponent,
    resolve: {
      titleSelectOptions: TitleSelectOptionsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.titleSelectOptions.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
