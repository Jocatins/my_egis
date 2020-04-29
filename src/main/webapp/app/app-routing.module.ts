import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ResourcesComponent } from './resources/resources.component';
import { PrivacypolicyComponent } from './resources/privacypolicy/privacypolicy.component';
import { CopyrightinformationComponent } from './resources/copyrightinformation/copyrightinformation.component';
import { ContactusComponent } from './resources/contactus/contactus.component';
import { DisclaimerComponent } from './resources/disclaimer/disclaimer.component';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

const LAGOSPortalRoutes: Routes = [
  {
    path: 'resources',
    component: ResourcesComponent,
    data: {},
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'resources/privacypolicy',
    component: PrivacypolicyComponent,
    data: {},
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'resources/copyrightinformation',
    component: CopyrightinformationComponent,
    data: {},
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'resources/contactus',
    component: ContactusComponent,
    data: {},
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'resources/disclaimer',
    component: DisclaimerComponent,
    data: {},
    canActivate: [UserRouteAccessService]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(LAGOSPortalRoutes),
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          data: {
            authorities: ['ROLE_ADMIN']
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.EgisexternalAccountModule)
        },
        ...LAYOUT_ROUTES
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class EgisexternalAppRoutingModule {}
