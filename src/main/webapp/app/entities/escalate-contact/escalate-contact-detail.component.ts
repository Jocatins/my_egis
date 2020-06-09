import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEscalateContact } from 'app/shared/model/escalate-contact.model';

@Component({
  selector: 'jhi-escalate-contact-detail',
  templateUrl: './escalate-contact-detail.component.html'
})
export class EscalateContactDetailComponent implements OnInit {
  escalateContact: IEscalateContact;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ escalateContact }) => {
      this.escalateContact = escalateContact;
    });
  }

  previousState() {
    window.history.back();
  }
}
