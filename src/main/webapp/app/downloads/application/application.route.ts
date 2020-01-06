import { Route } from '@angular/router';

import { ApplicationComponent } from './application.component';
import { WorkflowGuard } from '../workflow/workflow-guard.service';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

export const APPLICATION: Route = {
  path: 'appname',
  component: ApplicationComponent,
  data: {
    authorities: [],
    pageTitle: 'application.title'
  },
  canActivate: [WorkflowGuard]
};
