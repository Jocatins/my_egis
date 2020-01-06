import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from '../shared/shared.module';

import { DOWNLOADS_ROUTE, DownloadsComponent } from './';
import { ApplicationComponent } from './application/application.component';
import { ParametersComponent } from './parameters/parameters.component';
import { CompleteComponent} from './complete/complete.component'
import { FormDataService } from './data/formData.service';
import { WorkflowService } from './workflow/workflow.service';
import { WorkflowGuard } from './workflow/workflow-guard.service';


@NgModule({
    imports: [
      EgisexternalSharedModule,
      RouterModule.forRoot([ DOWNLOADS_ROUTE ], { useHash: true })
    ],
    declarations: [DownloadsComponent, ApplicationComponent, ParametersComponent, CompleteComponent],
    entryComponents: [
    ],
    providers: [
      FormDataService, WorkflowService, WorkflowGuard

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EgisexternalAppDownloadsModule {}
