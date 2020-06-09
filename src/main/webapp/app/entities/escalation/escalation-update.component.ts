import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IEscalation, Escalation } from 'app/shared/model/escalation.model';
import { EscalationService } from './escalation.service';

@Component({
  selector: 'jhi-escalation-update',
  templateUrl: './escalation-update.component.html'
})
export class EscalationUpdateComponent implements OnInit {
  isSaving: boolean;
  escalateDateDp: any;

  editForm = this.fb.group({
    id: [],
    escalateDate: []
  });

  constructor(protected escalationService: EscalationService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ escalation }) => {
      this.updateForm(escalation);
    });
  }

  updateForm(escalation: IEscalation) {
    this.editForm.patchValue({
      id: escalation.id,
      escalateDate: escalation.escalateDate
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const escalation = this.createFromForm();
    if (escalation.id !== undefined) {
      this.subscribeToSaveResponse(this.escalationService.update(escalation));
    } else {
      this.subscribeToSaveResponse(this.escalationService.create(escalation));
    }
  }

  private createFromForm(): IEscalation {
    return {
      ...new Escalation(),
      id: this.editForm.get(['id']).value,
      escalateDate: this.editForm.get(['escalateDate']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEscalation>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
