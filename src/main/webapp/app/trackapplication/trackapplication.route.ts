import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { TrackapplicationComponent } from './trackapplication.component';

export const TRACKAPPLICATION_ROUTE: Route = {
  path: 'trackapplication',
  component: TrackapplicationComponent,
  data: {
    authorities: [],
    pageTitle: 'trackapplication.title'
  },
  canActivate: [UserRouteAccessService]
};
