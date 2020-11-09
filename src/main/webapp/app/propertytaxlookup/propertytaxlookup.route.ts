import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { PropertytaxlookupComponent } from './propertytaxlookup.component';

export const PROPERTYTAXLOOKUP_ROUTE: Route = {
  path: 'propertytaxlookup',
  component: PropertytaxlookupComponent,
  data: {
    authorities: [],
    pageTitle: 'propertytaxlookup.title'
  },
  canActivate: [UserRouteAccessService]
};
