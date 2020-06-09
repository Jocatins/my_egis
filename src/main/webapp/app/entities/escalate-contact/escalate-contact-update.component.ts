import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IEscalateContact, EscalateContact } from 'app/shared/model/escalate-contact.model';
import { EscalateContactService } from './escalate-contact.service';

@Component({
  selector: 'jhi-escalate-contact-update',
  templateUrl: './escalate-contact-update.component.html'
})
export class EscalateContactUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    contact: []
  });

  constructor(
    protected escalateContactService: EscalateContactService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ escalateContact }) => {
      this.updateForm(escalateContact);
    });
  }

  updateForm(escalateContact: IEscalateContact) {
    this.editForm.patchValue({
      id: escalateContact.id,
      contact: escalateContact.contact
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const escalateContact = this.createFromForm();
    if (escalateContact.id !== undefined) {
      this.subscribeToSaveResponse(this.escalateContactService.update(escalateContact));
    } else {
      this.subscribeToSaveResponse(this.escalateContactService.create(escalateContact));
    }
  }

  private createFromForm(): IEscalateContact {
    return {
      ...new EscalateContact(),
      id: this.editForm.get(['id']).value,
      contact: this.editForm.get(['contact']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEscalateContact>>) {
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
