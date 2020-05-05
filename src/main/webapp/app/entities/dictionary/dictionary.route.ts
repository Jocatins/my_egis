import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dictionary } from 'app/shared/model/dictionary.model';
import { DictionaryService } from './dictionary.service';
import { DictionaryComponent } from './dictionary.component';
import { DictionaryDetailComponent } from './dictionary-detail.component';
import { DictionaryUpdateComponent } from './dictionary-update.component';
import { IDictionary } from 'app/shared/model/dictionary.model';

@Injectable({ providedIn: 'root' })
export class DictionaryResolve implements Resolve<IDictionary> {
  constructor(private service: DictionaryService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDictionary> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((dictionary: HttpResponse<Dictionary>) => dictionary.body));
    }
    return of(new Dictionary());
  }
}

export const dictionaryRoute: Routes = [
  {
    path: '',
    component: DictionaryComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.dictionary.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DictionaryDetailComponent,
    resolve: {
      dictionary: DictionaryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.dictionary.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DictionaryUpdateComponent,
    resolve: {
      dictionary: DictionaryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.dictionary.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DictionaryUpdateComponent,
    resolve: {
      dictionary: DictionaryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.dictionary.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
