import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { YourPropertyComponent } from './your-property.component';

export const YOURPROPERTY: Route = {
  path: 'yourproperty',
  component: YourPropertyComponent,
  data: {
    authorities: [],
    pageTitle: 'yourproperty.title'
  },
  canActivate: [UserRouteAccessService]
};
