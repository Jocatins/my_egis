import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { PropertytaxesComponent } from './propertytaxes.component';

export const PROPERTYTAXES_ROUTE: Route = {
  path: 'propertytaxes',
  component: PropertytaxesComponent,
  data: {
    authorities: [],
    pageTitle: 'propertytaxes.title'
  },
  canActivate: [UserRouteAccessService]
};
