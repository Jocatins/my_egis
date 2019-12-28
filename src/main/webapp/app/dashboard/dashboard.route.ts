import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { DashboardComponent } from './dashboard.component';

export const DASHBOARD_ROUTE: Route = {
  path: 'dashboard',
  component: DashboardComponent,
  data: {
    authorities: [],
    pageTitle: 'dashboard.title'
  },
  canActivate: [UserRouteAccessService]
};
