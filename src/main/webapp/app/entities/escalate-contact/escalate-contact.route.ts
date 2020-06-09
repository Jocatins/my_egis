import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EscalateContact } from 'app/shared/model/escalate-contact.model';
import { EscalateContactService } from './escalate-contact.service';
import { EscalateContactComponent } from './escalate-contact.component';
import { EscalateContactDetailComponent } from './escalate-contact-detail.component';
import { EscalateContactUpdateComponent } from './escalate-contact-update.component';
import { IEscalateContact } from 'app/shared/model/escalate-contact.model';

@Injectable({ providedIn: 'root' })
export class EscalateContactResolve implements Resolve<IEscalateContact> {
  constructor(private service: EscalateContactService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEscalateContact> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((escalateContact: HttpResponse<EscalateContact>) => escalateContact.body));
    }
    return of(new EscalateContact());
  }
}

export const escalateContactRoute: Routes = [
  {
    path: '',
    component: EscalateContactComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.escalateContact.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EscalateContactDetailComponent,
    resolve: {
      escalateContact: EscalateContactResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.escalateContact.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EscalateContactUpdateComponent,
    resolve: {
      escalateContact: EscalateContactResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.escalateContact.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EscalateContactUpdateComponent,
    resolve: {
      escalateContact: EscalateContactResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.escalateContact.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
