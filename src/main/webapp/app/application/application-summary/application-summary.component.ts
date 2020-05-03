import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TransInfo } from '../model/transinfo.model';
import { timeout, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Trans } from '../model/trans.model';
import { IBatch } from 'app/shared/model/batch.model';
import { IParcel } from 'app/shared/model/parcel.model';
import { IEGISDIctionary } from '../model/egisdictionary.model';
import { DashboardService } from 'app/dashboard/dashboard.service';

@Component({
  selector: 'jhi-trans-detail',
  templateUrl: './application-summary.component.html',
  styleUrls: ['application-summary.component.scss']
})
export class ApplicationSummaryComponent implements OnInit {
  message: string;

  code_: string;
  tab_: string;
  transInfo: TransInfo;
  docsreceived: boolean;
  prerequisite: boolean;
  procedure: boolean;
  associated: boolean;
  form: boolean;
  batch: IBatch;
  parcel: IParcel;

  spatialUnitLinkTypes: IEGISDIctionary[];
  landUseCategorys: IEGISDIctionary[];
  propertyTypes: IEGISDIctionary[];
  locationOfLands: IEGISDIctionary[];
  builtUpAreaTypes: IEGISDIctionary[];
  measurementTypes: IEGISDIctionary[];
  landUseTypes: IEGISDIctionary[];
  developmentStatus: IEGISDIctionary[];
  tenureTypes: IEGISDIctionary[];
  typeOfAccomodations: IEGISDIctionary[];

  spatialUnitLinkType: IEGISDIctionary;
  landUseCategory: IEGISDIctionary;
  propertyType: IEGISDIctionary;
  locationOfLand: IEGISDIctionary;
  builtUpAreaType: IEGISDIctionary;
  measurementUnitType: IEGISDIctionary;
  landUseType: IEGISDIctionary;
  developmentStat: IEGISDIctionary;
  tenureType: IEGISDIctionary;
  typeOfAccomodation: IEGISDIctionary;
  locationOfLand1: IEGISDIctionary;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    protected dashboardService: DashboardService,
    private httpClient: HttpClient
  ) {
    this.message = 'ApplicationSummaryComponent message';
  }

  linkClick() {}

  ngOnInit() {
    const params = this.route.snapshot.paramMap;
    this.code_ = params.get('code_');

    this.route.data.subscribe(({ batch }) => {
      this.batch = batch;
      this.parcel = this.batch.transactions[0].parcels[0];

      this.dashboardService.fetchDictionaryValuesObj('land_use_type').subscribe(
        data => {
          this.landUseType = JSON.parse(data.body.category).filter(x => this.parcel.landUseType === Number(x.id))[0];
        },
        err => {}
      );

      this.dashboardService.fetchDictionaryValuesObj('property_type').subscribe(
        data => {
          this.propertyType = JSON.parse(data.body.category).filter(x => this.parcel.propertyType === Number(x.id))[0];
        },
        err => {}
      );

      this.dashboardService.fetchDictionaryValuesObj('location_of_land').subscribe(
        data => {
          this.locationOfLand = JSON.parse(data.body.category).filter(x => this.parcel.location === Number(x.id))[0];
        },
        err => {}
      );

      this.dashboardService.fetchDictionaryValuesObj('measurement_type').subscribe(
        data => {
          this.measurementUnitType = JSON.parse(data.body.category).filter(x => this.parcel.measurementUnitType === Number(x.id))[0];
        },
        err => {}
      );

      this.dashboardService.fetchDictionaryValuesObj('built_up_area_type').subscribe(
        data => {
          this.builtUpAreaType = JSON.parse(data.body.category).filter(x => this.parcel.builtUpAreaType === Number(x.id))[0];
        },
        err => {}
      );

      this.dashboardService.fetchDictionaryValuesObj('location_of_land').subscribe(
        data => {
          this.locationOfLand = JSON.parse(data.body.category).filter(x => this.parcel.location === Number(x.id))[0];
        },
        err => {}
      );

      this.dashboardService.fetchDictionaryValuesObj('land_use_category').subscribe(
        data => {
          this.landUseCategory = JSON.parse(data.body.category).filter(x => this.parcel.landUseCategory === Number(x.id))[0];
        },
        err => {}
      );
    });
  }
}

export class TabDisplay {
  constructor(show1: boolean) {}
}
