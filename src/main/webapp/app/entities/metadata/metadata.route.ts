import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Metadata } from 'app/shared/model/metadata.model';
import { MetadataService } from './metadata.service';
import { MetadataComponent } from './metadata.component';
import { MetadataDetailComponent } from './metadata-detail.component';
import { MetadataUpdateComponent } from './metadata-update.component';
import { IMetadata } from 'app/shared/model/metadata.model';

@Injectable({ providedIn: 'root' })
export class MetadataResolve implements Resolve<IMetadata> {
  constructor(private service: MetadataService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMetadata> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((metadata: HttpResponse<Metadata>) => metadata.body));
    }
    return of(new Metadata());
  }
}

export const metadataRoute: Routes = [
  {
    path: '',
    component: MetadataComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.metadata.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MetadataDetailComponent,
    resolve: {
      metadata: MetadataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.metadata.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MetadataUpdateComponent,
    resolve: {
      metadata: MetadataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.metadata.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MetadataUpdateComponent,
    resolve: {
      metadata: MetadataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.metadata.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
