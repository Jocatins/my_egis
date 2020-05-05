import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Surveyor } from 'app/shared/model/surveyor.model';
import { SurveyorService } from './surveyor.service';
import { SurveyorComponent } from './surveyor.component';
import { SurveyorDetailComponent } from './surveyor-detail.component';
import { SurveyorUpdateComponent } from './surveyor-update.component';
import { ISurveyor } from 'app/shared/model/surveyor.model';

@Injectable({ providedIn: 'root' })
export class SurveyorResolve implements Resolve<ISurveyor> {
  constructor(private service: SurveyorService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISurveyor> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((surveyor: HttpResponse<Surveyor>) => surveyor.body));
    }
    return of(new Surveyor());
  }
}

export const surveyorRoute: Routes = [
  {
    path: '',
    component: SurveyorComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'egisexternalApp.surveyor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SurveyorDetailComponent,
    resolve: {
      surveyor: SurveyorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.surveyor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SurveyorUpdateComponent,
    resolve: {
      surveyor: SurveyorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.surveyor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SurveyorUpdateComponent,
    resolve: {
      surveyor: SurveyorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.surveyor.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
