import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISurveyor } from 'app/shared/model/surveyor.model';

@Component({
  selector: 'jhi-surveyor-detail',
  templateUrl: './surveyor-detail.component.html'
})
export class SurveyorDetailComponent implements OnInit {
  surveyor: ISurveyor;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ surveyor }) => {
      this.surveyor = surveyor;
    });
  }

  previousState() {
    window.history.back();
  }
}
