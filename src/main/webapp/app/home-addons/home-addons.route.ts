import { Route } from '@angular/router';
// import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

import { HomeAddonsComponent } from './home-addons.component';
import { PROPERTYTAX } from './property-tax-lookup/property-tax-lookup.route';
import { TAXES } from './property-taxes/property-taxes.route';
import { ONLINECALCULATOR } from './online-calculator/online-calculator.route';
import { TRUECOPY } from './certified-true-copy/certified-true-copy.route';
import { TRACK } from './track-application/track-application.route';
import { YOURPROPERTY } from './your-property/your-property.route';
import { USERREG } from './user-registeration/user-registeration.route';

export const HOMEADDONS_ROUTE: Route = {
  path: 'homeaddons',
  component: HomeAddonsComponent,

  data: {
    authorities: [],
    pageTitle: 'homeaddons.title'
  },
  canActivate: [],
  children: [YOURPROPERTY, USERREG, TRACK, TAXES, PROPERTYTAX, TRUECOPY, ONLINECALCULATOR]
};
