import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITitleSelectOptions } from 'app/shared/model/title-select-options.model';

@Component({
  selector: 'jhi-title-select-options-detail',
  templateUrl: './title-select-options-detail.component.html'
})
export class TitleSelectOptionsDetailComponent implements OnInit {
  titleSelectOptions: ITitleSelectOptions;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ titleSelectOptions }) => {
      this.titleSelectOptions = titleSelectOptions;
    });
  }

  previousState() {
    window.history.back();
  }
}
