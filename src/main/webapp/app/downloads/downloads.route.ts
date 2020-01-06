import { Route } from '@angular/router';

import { DownloadsComponent } from './downloads.component';
import { APPLICATION } from './application/application.route';
import { PARAMETERS } from './parameters/parameters.route';
import { COMPLETE } from './complete/complete.route';
import { WorkflowGuard } from './workflow/workflow-guard.service';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

export const DOWNLOADS_ROUTE: Route = {
  path: 'downloads',
  component: DownloadsComponent,
  data: {
    authorities: [],
    pageTitle: 'downloads.title'
  },
  canActivate: [],//[UserRouteAccessService],
  children: [
    APPLICATION,
    PARAMETERS,
    COMPLETE
  ]
};
