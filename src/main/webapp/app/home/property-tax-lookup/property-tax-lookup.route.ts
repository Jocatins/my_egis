import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { PropertyTaxLookupComponent } from './property-tax-lookup.component';

export const PROPERTYTAX: Route = {
  path: 'property-tax',
  component: PropertyTaxLookupComponent,
  data: {
    authorities: [],
    pageTitle: 'property-tax.title'
  },
  canActivate: [UserRouteAccessService]
};
