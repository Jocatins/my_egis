import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ApplicantsComponent } from './applicants.component';

export const APPLICANTS_1: Route = {
  path: 'applicants',
  component: ApplicantsComponent,
  data: {
    authorities: [],
    pageTitle: 'applicants.title'
  },
  canActivate: [UserRouteAccessService]
};

export const APPLICANTS: Route = {
  path: 'applicants/:batchId',
  component: ApplicantsComponent,
  data: {
    authorities: [],
    pageTitle: 'applicants.title'
  },
  canActivate: [UserRouteAccessService]
};
