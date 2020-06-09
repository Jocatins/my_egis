import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEscalation } from 'app/shared/model/escalation.model';

@Component({
  selector: 'jhi-escalation-detail',
  templateUrl: './escalation-detail.component.html'
})
export class EscalationDetailComponent implements OnInit {
  escalation: IEscalation;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ escalation }) => {
      this.escalation = escalation;
    });
  }

  previousState() {
    window.history.back();
  }
}
