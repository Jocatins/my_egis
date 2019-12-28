import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IBatch } from 'app/shared/model/batch.model';
import { IParty } from 'app/shared/model/party.model';
import { ISupportingDocument } from 'app/shared/model/supporting-document.model';
import { TransactionService } from 'app/entities/transaction/transaction.service';
import { IParcel } from 'app/shared/model/parcel.model';

@Component({
  selector: 'jhi-overview',
  templateUrl: './trans-landing.component.html',
  styleUrls: ['trans-landing.component.scss']
})
export class TranslandingComponent implements OnInit {
  batch: IBatch;
  parties: IParty[];
  supportingDocuments: ISupportingDocument[];
  parcels: IParcel[];
  // parcelid: number;

  constructor(private router: Router, protected activatedRoute: ActivatedRoute,
    protected transactionService: TransactionService,
    ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ batch }) => {
      this.batch = batch;
      this.parties = batch.parties;

      this.transactionService.find(batch.transactions[0].id).subscribe(
        data => {
          this.supportingDocuments = data.body.docs;

          if ( data.body.parcels.length ===0){
            this.parcels = undefined
          }else{
            this.parcels = data.body.parcels;
          }
        },
        () => alert()
      );

    });
    //alert(this.launitid);

  }

  editNewApplicant(newOrEdit: string, batchId: number, partyId: number) {
    this.router.navigate(['/application/applicant', batchId, partyId, newOrEdit]);
  }


  editNewDocument(newOrEdit: string, batchId: number, documentId: number) {
    const path = '/application/document';

    this.router.navigate([path, batchId, documentId, newOrEdit]);
  }

  editNewProperty(newOrEdit: string, parcelId: number, batchId: number) {
    const path =  '/application/property'; // '/application/document/new';

    this.router.navigate([path, batchId, parcelId, newOrEdit ]);
    // this.router.navigate([path]);
  }
}
