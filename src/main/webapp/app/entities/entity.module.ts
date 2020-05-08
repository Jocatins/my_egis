import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'batch',
        loadChildren: () => import('./batch/batch.module').then(m => m.EgisexternalBatchModule)
      },
      {
        path: 'transaction',
        loadChildren: () => import('./transaction/transaction.module').then(m => m.EgisexternalTransactionModule)
      },
      {
        path: 'transaction-ext',
        loadChildren: () => import('./transaction-ext/transaction-ext.module').then(m => m.EgisexternalTransactionExtModule)
      },
      {
        path: 'supporting-document',
        loadChildren: () => import('./supporting-document/supporting-document.module').then(m => m.EgisexternalSupportingDocumentModule)
      },
      {
        path: 'party',
        loadChildren: () => import('./party/party.module').then(m => m.EgisexternalPartyModule)
      },
      {
        path: 'address',
        loadChildren: () => import('./address/address.module').then(m => m.EgisexternalAddressModule)
      },
      {
        path: 'parcel',
        loadChildren: () => import('./parcel/parcel.module').then(m => m.EgisexternalParcelModule)
      },
      {
        path: 'user-ext',
        loadChildren: () => import('./user-ext/user-ext.module').then(m => m.EgisexternalUserExtModule)
      },
      {
        path: 'surveyor',
        loadChildren: () => import('./surveyor/surveyor.module').then(m => m.EgisexternalSurveyorModule)
      },
      {
        path: 'survey-transaction',
        loadChildren: () => import('./survey-transaction/survey-transaction.module').then(m => m.EgisexternalSurveyTransactionModule)
      },
      {
        path: 'dictionary',
        loadChildren: () => import('./dictionary/dictionary.module').then(m => m.EgisexternalDictionaryModule)
      },
      {
        path: 'metadata',
        loadChildren: () => import('./metadata/metadata.module').then(m => m.EgisexternalMetadataModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class EgisexternalEntityModule {}
