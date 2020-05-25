import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TransInfo } from '../model/transinfo.model';
import { BatchService } from '../ext/batch/batch.service';
import { IParty, Party } from 'app/shared/model/party.model';
import { IBatch } from 'app/shared/model/batch.model';
import { PartyDeleteDialogComponent } from '../party/party-delete-dialog.component';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Parcel } from 'app/shared/model/parcel.model';
import { TransactionService } from 'app/entities/transaction/transaction.service';

@Component({
  selector: 'jhi-trans-detail',
  templateUrl: './applicants.component.html',
  styleUrls: ['applicants.component.scss']
})
export class ApplicantsComponent implements OnInit {
  batch: IBatch;
  message: string;

  code_: string;
  tab_: string;
  transInfo: TransInfo;
  docsreceived: boolean;
  prerequisite: boolean;
  procedure: boolean;
  associated: boolean;
  form: boolean;
  parties: IParty[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private batchService: BatchService,
    protected activatedRoute: ActivatedRoute,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected transService: TransactionService
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.paramMap;
    this.code_ = params.get('code_');
    this.eventManager.subscribe("partyListModification", () => {
      this.refreshParty(Number(params.get('batchId')));
    })
    this.refreshParty(Number(params.get('batchId')));
  }

  editNewApplicant(newOrEdit: string, batchId: number, partyId: number) {
    this.router.navigate(['/application/applicant', batchId, partyId, newOrEdit]);
  }

  goToParcel(batchId: number) {
    let newOrEdit = 'edit';
    let parcelId = 0;

    this.batchService.find(batchId).subscribe(
      data => {
        this.batch = data.body;
        if (this.batch.transactions[0].parcels.length !== 0){
          newOrEdit = 'edit';
          parcelId = this.batch.transactions[0].parcels[0].id;
          this.router.navigate(['/application/property', batchId, parcelId, newOrEdit]);
        }else{
          const transaction =  this.batch.transactions[0];
          this.transService.update(transaction).subscribe(
            trans=>{

              this.router.navigate(['/application/property', batchId, 0, "new"]);
            }
          )

        }

      },
      () => alert()
    );
  }

  myAlert() {
    alert('We are testing');
  }

  refreshParty(batchId: number) {
    this.batchService.find(batchId).subscribe(
      data => {
        this.batch = data.body;
        this.parties = data.body.parties;
      },
      () => alert()
    );
  }


  deleteParty(party: Party, batchId: number) {
    const modalRef = this.modalService.open(PartyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.party = party;
    this.eventManager.subscribe('partyListModification', () => {
      this.batchService.find(batchId).subscribe(
        data => {
          this.parties = data.body.parties;
        },
        () => alert()
      );
    });
  }
}
