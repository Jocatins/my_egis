import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { OnlinecalculatorComponent } from './onlinecalculator.component';

export const ONLINECALCULATOR_ROUTE: Route = {
  path: 'onlinecalculator',
  component: OnlinecalculatorComponent,
  data: {
    authorities: [],
    pageTitle: 'onlinecalculator.title'
  },
  canActivate: [UserRouteAccessService]
};
