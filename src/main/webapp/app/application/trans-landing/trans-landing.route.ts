import { Route, ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBatch, Batch } from 'app/shared/model/batch.model';
import { Observable, of } from 'rxjs';
import { BatchService } from 'app/entities/batch/batch.service';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { TranslandingComponent } from './trans-landing.component';
import { PartyExtUpdateComponent } from '../ext/party/party-update.component';
import { SupportingExtDocumentUpdateComponent } from '../ext/supporting-document/supporting-document-update.component';
import { ParcelExtUpdateComponent } from '../ext/parcel/parcel-update.component';

import { map } from 'rxjs/operators';
import { IParcel, Parcel } from 'app/shared/model/parcel.model';
import { ParcelService } from 'app/entities/parcel/parcel.service';
import { IParty, Party } from 'app/shared/model/party.model';
import { PartyService } from 'app/entities/party/party.service';
import { ISupportingDocument, SupportingDocument } from 'app/shared/model/supporting-document.model';
import { SupportingDocumentService } from 'app/entities/supporting-document/supporting-document.service';

@Injectable({ providedIn: 'root' })
export class BatchExtResolve implements Resolve<IBatch> {
  constructor(private service: BatchService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBatch> {
    const id = route.params['id'];
    if (id) {
      // this.service.find(id).subscribe(
      //   (data) =>{
      //     //alert(JSON.stringify(data))
      //   }
      // )

      return this.service.find(id).pipe(map((batch: HttpResponse<Batch>) => batch.body));
    }
    return of(new Batch());
  }
}

@Injectable({ providedIn: 'root' })
export class ParcelExtResolve implements Resolve<IParcel> {
  constructor(private parcelService: ParcelService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<IParcel> {
    // const batchId = route.params['batchId'];
    const newOrEdit = route.params['newOrEdit'];
    const parcelId = route.params['parcelId'];

    if (newOrEdit === 'edit') {
      return this.parcelService.find(parcelId).pipe(
        map((parcel: HttpResponse<Parcel>) => {
          return parcel.body;
        })
      );
    }
    const parcel = new Parcel();
    return of(parcel);
  }
}

@Injectable({ providedIn: 'root' })
export class PartyExtResolve implements Resolve<IParty> {
  constructor(private partyService: PartyService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<IParty> {
    // const batchId = route.params['batchId'];
    const newOrEdit = route.params['newOrEdit'];
    const partyId = route.params['partyId'];

    if (newOrEdit === 'edit') {
      return this.partyService.find(partyId).pipe(
        map((party: HttpResponse<IParty>) => {
          return party.body;
        })
      );
    }
    const party = new Party();
    return of(party);
  }
}

@Injectable({ providedIn: 'root' })
export class SupportingDocExtResolve implements Resolve<ISupportingDocument> {
  constructor(private sdService: SupportingDocumentService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ISupportingDocument> {
    // const batchId = route.params['batchId'];
    const newOrEdit = route.params['newOrEdit'];
    const supportingDocumentId = route.params['documentId'];

    if (newOrEdit === 'edit') {
      return this.sdService.find(supportingDocumentId).pipe(
        map((doc: HttpResponse<ISupportingDocument>) => {
          return doc.body;
        })
      );
    }
    const doc = new SupportingDocument();
    return of(doc);
  }
}

export const TRANS_LANDING: Route = {
  path: 'translanding',
  component: TranslandingComponent,
  resolve: {
    batch: BatchExtResolve
  },
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'egisexternalApp.batch.home.title'
  },
  canActivate: [UserRouteAccessService]
};

export const TRANS_LANDING_VIEW: Route = {
  path: 'translanding/:id',
  component: TranslandingComponent,
  resolve: {
    batch: BatchExtResolve
  },
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'egisexternalApp.batch.home.title'
  },
  canActivate: [UserRouteAccessService]
};

export const NEW_APPLICANT: Route = {
  path: 'applicant/:batchId/:partyId/:newOrEdit',
  component: PartyExtUpdateComponent,
  resolve: {
    party: PartyExtResolve
  },
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'egisexternalApp.batch.home.title'
  },
  canActivate: [UserRouteAccessService]
};

export const EDIT_APPLICANT: Route = {
  path: 'applicant/new/:partyId/',
  component: PartyExtUpdateComponent,
  resolve: {
    party: PartyExtResolve
  },
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'egisexternalApp.batch.home.title'
  },
  canActivate: [UserRouteAccessService]
};

export const NEW_EDIT_DOCUMENT: Route = {
  path: 'document/:batchId/:documentId/:newOrEdit',
  component: SupportingExtDocumentUpdateComponent,
  resolve: {
    supportingDoc: SupportingDocExtResolve
  },
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'egisexternalApp.batch.home.title'
  },
  canActivate: [UserRouteAccessService]
};

export const NEW_PARCEL: Route = {
  path: 'property/:batchId/:parcelId/:newOrEdit',
  component: ParcelExtUpdateComponent,
  resolve: {
    parcel: ParcelExtResolve
  },
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'egisexternalApp.batch.home.title'
  },
  canActivate: [UserRouteAccessService]
};

// export const EDIT_APPLICANT: Route = {
//   path: '/application/:id/applicant/edit',
//   component: PartyExtUpdateComponent,
//   resolve: {
//     batch: BatchExtResolve
//   },
//   data: {
//     authorities: ['ROLE_USER'],
//     pageTitle: 'egisexternalApp.batch.home.title'
//   },
//   canActivate: [UserRouteAccessService]
// };
