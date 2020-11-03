import { Route } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

import { HomeComponent } from './home.component';
import { PROPERTYTAX } from './property-tax-lookup/property-tax-lookup.route';
import { TAXES } from './property-taxes/property-taxes.route';
import { ONLINECALCULATOR } from './online-calculator/online-calculator.route';
import { TRUECOPY } from './certified-true-copy/certified-true-copy.route';
import { TRACK } from './track-application/track-application.route';
import { YOURPROPERTY } from './your-property/your-property.route';
import { USERREG } from './user-registeration/user-registeration.route';

export const HOME_ROUTE: Route = {
  path: '',
  component: HomeComponent,

  data: {
    authorities: [],
    pageTitle: 'home.title'
  },
  canActivate: [UserRouteAccessService],
  children: [YOURPROPERTY, USERREG, TRACK, TAXES, PROPERTYTAX, TRUECOPY, ONLINECALCULATOR]
};
