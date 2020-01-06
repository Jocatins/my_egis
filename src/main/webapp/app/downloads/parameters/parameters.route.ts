import { Route } from '@angular/router';

import { ParametersComponent } from './parameters.component';
import { WorkflowGuard } from '../workflow/workflow-guard.service';

export const PARAMETERS: Route = {
  path: 'parameters',
  component: ParametersComponent,
  data: {
    authorities: [],
    pageTitle: 'parameters.title'
  },
  canActivate: [WorkflowGuard]
};
