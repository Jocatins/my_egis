import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { PropertyComponent } from './property.component';

export const PROPERTY: Route = {
  path: 'property',
  component: PropertyComponent,
  data: {
    authorities: [],
    pageTitle: 'property.title'
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
