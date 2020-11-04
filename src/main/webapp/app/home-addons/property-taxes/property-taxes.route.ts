import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { PropertyTaxesComponent } from './property-taxes.component';

export const TAXES: Route = {
  path: 'property-taxes',
  component: PropertyTaxesComponent,
  data: {
    authorities: [],
    pageTitle: 'property-taxes.title'
  },
  canActivate: [UserRouteAccessService]
};
