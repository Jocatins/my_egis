import { Route } from '@angular/router';

import { CompleteComponent } from './complete.component';
import { WorkflowGuard } from '../workflow/workflow-guard.service';

export const COMPLETE: Route = {
  path: 'complete',
  component: CompleteComponent,
  data: {
    authorities: [],
    pageTitle: 'complete.title'
  },
  canActivate: [WorkflowGuard]
};
