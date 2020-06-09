import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IYearSubscription } from 'app/shared/model/year-subscription.model';

@Component({
  selector: 'jhi-year-subscription-detail',
  templateUrl: './year-subscription-detail.component.html'
})
export class YearSubscriptionDetailComponent implements OnInit {
  yearSubscription: IYearSubscription;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ yearSubscription }) => {
      this.yearSubscription = yearSubscription;
    });
  }

  previousState() {
    window.history.back();
  }
}
