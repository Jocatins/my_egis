import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParcel } from 'app/shared/model/parcel.model';
import { IEGISDIctionary } from 'app/application/model/egisdictionary.model';
import { DashboardService } from 'app/dashboard/dashboard.service';

@Component({
  selector: 'jhi-parcel-detail',
  templateUrl: './parcel-detail.component.html'
})
export class ParcelDetailComponent implements OnInit {
  parcel: IParcel;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ parcel }) => {
      this.parcel = parcel;
    });
  }

  previousState() {
    window.history.back();
  }
}
