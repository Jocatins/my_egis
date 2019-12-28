import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from 'app/shared/shared.module';
import { TransactionExtComponent } from './transaction-ext.component';
import { TransactionExtDetailComponent } from './transaction-ext-detail.component';
import { TransactionExtUpdateComponent } from './transaction-ext-update.component';
import { TransactionExtDeleteDialogComponent } from './transaction-ext-delete-dialog.component';
import { transactionExtRoute } from './transaction-ext.route';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forChild(transactionExtRoute)],
  declarations: [
    TransactionExtComponent,
    TransactionExtDetailComponent,
    TransactionExtUpdateComponent,
    TransactionExtDeleteDialogComponent
  ],
  entryComponents: [TransactionExtDeleteDialogComponent]
})
export class EgisexternalTransactionExtModule {}
