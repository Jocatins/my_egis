import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { CertifiedTrueCopyComponent } from './certified-true-copy.component';

export const TRUECOPY: Route = {
  path: 'certifiedtruecopy',
  component: CertifiedTrueCopyComponent,
  data: {
    authorities: [],
    pageTitle: 'certifiedtruecopy.title'
  },
  canActivate: [UserRouteAccessService]
};
