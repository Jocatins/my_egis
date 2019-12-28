import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ApplicationSummaryComponent } from './application-summary.component';

export const APPLICATION_SUMMARY: Route = {
  path: 'application-summary',
  component: ApplicationSummaryComponent,
  data: {
    authorities: [],
    pageTitle: 'application-summary.title'
  },
  canActivate: [UserRouteAccessService]
};

// export const TRANS_DETAIL_DETAIL: Route = {
//   path: 'trans-detail/:code_/:tab_',
//   component: TransDetailComponent,
//   data: {
//     authorities: [],
//     pageTitle: 'trans-detail.title'
//   },
//   canActivate: [UserRouteAccessService]
// };
