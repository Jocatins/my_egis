import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Parcel } from 'app/shared/model/parcel.model';
import { ParcelService } from './parcel.service';
import { ParcelComponent } from './parcel.component';
import { ParcelDetailComponent } from './parcel-detail.component';
import { ParcelExtUpdateComponent } from './parcel-update.component';
import { IParcel } from 'app/shared/model/parcel.model';

@Injectable({ providedIn: 'root' })
export class ParcelResolve implements Resolve<IParcel> {
  constructor(private service: ParcelService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IParcel> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((parcel: HttpResponse<Parcel>) => parcel.body));
    }
    return of(new Parcel());
  }
}



export const parcelRoute: Routes = [
  {
    path: '',
    component: ParcelComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.parcel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ParcelDetailComponent,
    resolve: {
      parcel: ParcelResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.parcel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ParcelExtUpdateComponent,
    resolve: {
      parcel: ParcelResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.parcel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ParcelExtUpdateComponent,
    resolve: {
      parcel: ParcelResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.parcel.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
