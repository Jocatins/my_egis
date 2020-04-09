import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from 'app/shared/shared.module';
import { PartyComponent } from './party.component';
import { PartyDetailComponent } from './party-detail.component';
import { PartyExtUpdateComponent } from './party-update.component';
import { PartyDeleteDialogComponent } from './party-delete-dialog.component';
import { partyRoute } from './party.route';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forChild(partyRoute)],
  declarations: [PartyComponent, PartyDetailComponent, PartyExtUpdateComponent, PartyDeleteDialogComponent],
  entryComponents: [PartyDeleteDialogComponent]
})
export class EgisexternalPartyModule {}
