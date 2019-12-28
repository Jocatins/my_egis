import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { SupportingDocsComponent } from './supporting-docs.component';

export const SUPPORTING_DOC: Route = {
  path: 'supporting-docs',
  component: SupportingDocsComponent,
  data: {
    authorities: [],
    pageTitle: 'supporting-docs.title'
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
