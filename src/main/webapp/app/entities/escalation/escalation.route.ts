import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Escalation } from 'app/shared/model/escalation.model';
import { EscalationService } from './escalation.service';
import { EscalationComponent } from './escalation.component';
import { EscalationDetailComponent } from './escalation-detail.component';
import { EscalationUpdateComponent } from './escalation-update.component';
import { IEscalation } from 'app/shared/model/escalation.model';

@Injectable({ providedIn: 'root' })
export class EscalationResolve implements Resolve<IEscalation> {
  constructor(private service: EscalationService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEscalation> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((escalation: HttpResponse<Escalation>) => escalation.body));
    }
    return of(new Escalation());
  }
}

export const escalationRoute: Routes = [
  {
    path: '',
    component: EscalationComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.escalation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EscalationDetailComponent,
    resolve: {
      escalation: EscalationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.escalation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EscalationUpdateComponent,
    resolve: {
      escalation: EscalationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.escalation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EscalationUpdateComponent,
    resolve: {
      escalation: EscalationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.escalation.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
