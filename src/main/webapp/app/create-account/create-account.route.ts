import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { CreateAccountComponent } from './create-account.component';

export const CREATE_ACCOUNT_ROUTE: Route = {
  path: 'create-account',
  component: CreateAccountComponent,
  data: {
    authorities: [],
    pageTitle: 'create-account.title'
  },
  canActivate: [UserRouteAccessService]
};
