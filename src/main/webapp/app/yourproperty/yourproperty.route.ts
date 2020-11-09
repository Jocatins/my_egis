import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { YourpropertyComponent } from './yourproperty.component';

export const YOURPROPERTY_ROUTE: Route = {
  path: 'yourproperty',
  component: YourpropertyComponent,
  data: {
    authorities: [],
    pageTitle: 'yourproperty.title'
  },
  canActivate: [UserRouteAccessService]
};
