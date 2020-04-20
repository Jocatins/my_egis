import { Route, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Property1Component } from './property1.component';
import { ISupportingDocument, SupportingDocument } from 'app/shared/model/supporting-document.model';
import { SupportingDocumentService } from 'app/entities/supporting-document/supporting-document.service';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PropertyResolve implements Resolve<ISupportingDocument> {
  constructor(private sdService: SupportingDocumentService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ISupportingDocument> {
    // const batchId = route.params['batchId'];
    const id = route.params['id'];
    const param1 = route.params['param1'];

    // alert (id);
    // alert (param1);

    // :id/:param1

    // if (newOrEdit === 'edit') {
    //   return this.sdService.find(supportingDocumentId).pipe(
    //     map((doc: HttpResponse<ISupportingDocument>) => {
    //       return doc.body;
    //     })
    //   );
    // }
    const doc = new SupportingDocument();
    doc.documentNumber = '989889';
    return of(doc);
  }
}

export const PROPERTY1: Route = {
  path: 'property1',
  component: Property1Component,
  data: {
    authorities: [],
    pageTitle: 'property.title'
  },
  canActivate: [UserRouteAccessService]
};

export const PROPERTY1_PARAM1: Route = {
  path: 'property1/:id',
  component: Property1Component,
  data: {
    authorities: [],
    pageTitle: 'property.title'
  },
  canActivate: [UserRouteAccessService]
};

export const PROPERTY1_PARAM1_PARAM2: Route = {
  path: 'property1/:id/:param1',
  component: Property1Component,
  resolve: {
    doc: PropertyResolve
  },

  data: {
    authorities: [],
    pageTitle: 'property.title'
  },
  canActivate: [UserRouteAccessService]
};
