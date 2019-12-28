import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupportingDocument } from 'app/shared/model/supporting-document.model';
import { SupportingDocumentService } from './supporting-document.service';
import { SupportingDocumentComponent } from './supporting-document.component';
import { SupportingDocumentDetailComponent } from './supporting-document-detail.component';
import { SupportingExtDocumentUpdateComponent } from './supporting-document-update.component';
import { ISupportingDocument } from 'app/shared/model/supporting-document.model';

@Injectable({ providedIn: 'root' })
export class SupportingDocumentResolve implements Resolve<ISupportingDocument> {
  constructor(private service: SupportingDocumentService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISupportingDocument> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((supportingDocument: HttpResponse<SupportingDocument>) => supportingDocument.body));
    }
    return of(new SupportingDocument());
  }
}

export const supportingDocumentRoute: Routes = [
  {
    path: '',
    component: SupportingDocumentComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.supportingDocument.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SupportingDocumentDetailComponent,
    resolve: {
      supportingDocument: SupportingDocumentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.supportingDocument.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SupportingExtDocumentUpdateComponent,
    resolve: {
      supportingDocument: SupportingDocumentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.supportingDocument.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SupportingExtDocumentUpdateComponent,
    resolve: {
      supportingDocument: SupportingDocumentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.supportingDocument.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
