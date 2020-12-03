import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocumentRequest } from 'app/shared/model/document-request.model';
import { DocumentRequestService } from './document-request.service';
import { DocumentRequestComponent } from './document-request.component';
import { DocumentRequestDetailComponent } from './document-request-detail.component';
import { DocumentRequestUpdateComponent } from './document-request-update.component';
import { IDocumentRequest } from 'app/shared/model/document-request.model';

@Injectable({ providedIn: 'root' })
export class DocumentRequestResolve implements Resolve<IDocumentRequest> {
  constructor(private service: DocumentRequestService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDocumentRequest> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((documentRequest: HttpResponse<DocumentRequest>) => documentRequest.body));
    }
    return of(new DocumentRequest());
  }
}

export const documentRequestRoute: Routes = [
  {
    path: '',
    component: DocumentRequestComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.documentRequest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DocumentRequestDetailComponent,
    resolve: {
      documentRequest: DocumentRequestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.documentRequest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DocumentRequestUpdateComponent,
    resolve: {
      documentRequest: DocumentRequestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.documentRequest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DocumentRequestUpdateComponent,
    resolve: {
      documentRequest: DocumentRequestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.documentRequest.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
