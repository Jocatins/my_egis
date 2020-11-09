import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { CertifiedtruecopyComponent } from './certifiedtruecopy.component';

export const CERTIFIEDTRUECOPY_ROUTE: Route = {
  path: 'certifiedtruecopy',
  component: CertifiedtruecopyComponent,
  data: {
    authorities: [],
    pageTitle: 'certifiedtruecopy.title'
  },
  canActivate: [UserRouteAccessService]
};
