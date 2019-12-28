import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Party } from 'app/shared/model/party.model';
import { PartyService } from './party.service';
import { PartyComponent } from './party.component';
import { PartyDetailComponent } from './party-detail.component';
import { PartyExtUpdateComponent } from './party-update.component';
import { IParty } from 'app/shared/model/party.model';

@Injectable({ providedIn: 'root' })
export class PartyResolve implements Resolve<IParty> {
  constructor(private service: PartyService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IParty> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((party: HttpResponse<Party>) => party.body));
    }
    return of(new Party());
  }
}

export const partyRoute: Routes = [
  {
    path: '',
    component: PartyComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.party.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PartyDetailComponent,
    resolve: {
      party: PartyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.party.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PartyExtUpdateComponent,
    resolve: {
      party: PartyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.party.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PartyExtUpdateComponent,
    resolve: {
      party: PartyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'egisexternalApp.party.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
