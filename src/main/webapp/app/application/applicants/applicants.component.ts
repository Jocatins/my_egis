import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TransInfo } from '../model/transinfo.model';
import { BatchService } from '../ext/batch/batch.service';
import { IParty } from 'app/shared/model/party.model';
import { IBatch } from 'app/shared/model/batch.model';

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
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.paramMap;
    this.code_ = params.get('code_');

    this.message = 'gdgdhdhdd d';
    alert(params.get('batchId'));

    this.refreshParty(Number(params.get('batchId')));
  }

  editNewApplicant1(newOrEdit: string, batchId: number, partyId: number) {
    this.router.navigate(['/application/applicant', batchId, partyId, newOrEdit]);
  }

  goToParcel(batchId: number) {
    alert('parcel information');
    alert(JSON.stringify(this.batch));

    let newOrEdit = 'new';
    let parcelId = 0;

    this.batchService.find(batchId).subscribe(
      data => {
        this.batch = data.body;
        if (undefined !== this.batch.transactions[0].parcels[0]) {
          newOrEdit = 'edit';
          parcelId = this.batch.transactions[0].parcels[0].id;
        }
        this.router.navigate(['/application/property', batchId, parcelId, newOrEdit]);
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
}
