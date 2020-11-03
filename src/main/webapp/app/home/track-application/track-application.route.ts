import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { TrackApplicationComponent } from './track-application.component';

export const TRACK: Route = {
  path: 'track-application',
  component: TrackApplicationComponent,
  data: {
    authorities: [],
    pageTitle: 'track-application.title'
  },
  canActivate: [UserRouteAccessService]
};
