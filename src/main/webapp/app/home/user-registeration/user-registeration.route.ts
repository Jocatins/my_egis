import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { UserRegisterationComponent } from './user-registeration.component';

export const USERREG: Route = {
  path: 'user-registeration',
  component: UserRegisterationComponent,
  data: {
    authorities: [],
    pageTitle: 'user-registeration.title'
  },
  canActivate: [UserRouteAccessService]
};
