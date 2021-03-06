import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ApplicationComponent } from './application.component';
import { LANDING } from './landing/landing.route';
import { OVERVIEW } from './overview/overview.route';
import { APPLICANTS } from './applicants/applicants.route';
import { APPLICATION_SUMMARY } from './application-summary/application-summary.route';
import { PROPERTY, PROPERTY_TEST, PROPERTY_TEST_P1, PROPERTY_TEST_P1_P2 } from './property/property.route';
import { SUPPORTING_DOC } from './supporting-docs/supporting-docs.route';
import { TRANS_LANDING_VIEW, EDIT_APPLICANT_NEW } from './trans-landing/trans-landing.route';
import { TRANS_LANDING } from './trans-landing/trans-landing.route';

import { NEW_APPLICANT, NEW_EDIT_DOCUMENT, NEW_PARCEL, SUPP_DOCUMENTS } from './trans-landing/trans-landing.route';
import { PROPERTY1, PROPERTY1_PARAM1, PROPERTY1_PARAM1_PARAM2 } from './property1/property1.route';

export const APPLICATION_ROUTE: Route = {
  path: 'application',
  component: ApplicationComponent,
  data: {
    authorities: [],
    pageTitle: 'application.title'
  },
  canActivate: [UserRouteAccessService],
  children: [
    LANDING,
    OVERVIEW,
    APPLICANTS,
    APPLICATION_SUMMARY,
    PROPERTY,
    SUPPORTING_DOC,
    TRANS_LANDING_VIEW,
    TRANS_LANDING,
    NEW_APPLICANT,
    NEW_PARCEL,
    NEW_EDIT_DOCUMENT,
    SUPP_DOCUMENTS,
    EDIT_APPLICANT_NEW,
    PROPERTY_TEST,
    PROPERTY_TEST_P1,
    PROPERTY_TEST_P1_P2,
    PROPERTY1,
    PROPERTY1_PARAM1,
    PROPERTY1_PARAM1_PARAM2
  ]
};
