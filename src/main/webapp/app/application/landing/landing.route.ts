import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { LandingComponent } from './landing.component';

export const LANDING: Route = {
  path: 'landing',
  component: LandingComponent,
  data: {
    authorities: [],
    pageTitle: 'landing.title'
  },
  canActivate: [UserRouteAccessService]
};
