import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { DashboardComponent } from './dashboard.component';
import { BatchComponent } from '../application/ext/batch/batch.component';

export const DASHBOARD_ROUTE: Route = {
  path: 'dashboard',
  component: DashboardComponent,
  data: {
    authorities: [],
    pageTitle: 'dashboard.title'
  },
  canActivate: [UserRouteAccessService]
};

export const DASHBOARD_ROUTE_OLD: Route = {
  path: 'dashboard',
  component: BatchComponent,
  data: {
    authorities: [],
    pageTitle: 'dashboard.title'
  },
  canActivate: [UserRouteAccessService]
};
