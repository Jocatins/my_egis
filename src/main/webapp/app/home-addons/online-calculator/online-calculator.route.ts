import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { OnlineCalculatorComponent } from './online-calculator.component';

export const ONLINECALCULATOR: Route = {
  path: 'online-calculator',
  component: OnlineCalculatorComponent,
  data: {
    authorities: [],
    pageTitle: 'online-calculator.title'
  },
  canActivate: [UserRouteAccessService]
};
