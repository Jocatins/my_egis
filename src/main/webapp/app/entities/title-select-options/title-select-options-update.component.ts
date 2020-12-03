import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITitleSelectOptions, TitleSelectOptions } from 'app/shared/model/title-select-options.model';
import { TitleSelectOptionsService } from './title-select-options.service';

@Component({
  selector: 'jhi-title-select-options-update',
  templateUrl: './title-select-options-update.component.html'
})
export class TitleSelectOptionsUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    transactionId: [],
    queryField: [],
    queryValue: []
  });

  constructor(
    protected titleSelectOptionsService: TitleSelectOptionsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ titleSelectOptions }) => {
      this.updateForm(titleSelectOptions);
    });
  }

  updateForm(titleSelectOptions: ITitleSelectOptions) {
    this.editForm.patchValue({
      id: titleSelectOptions.id,
      transactionId: titleSelectOptions.transactionId,
      queryField: titleSelectOptions.queryField,
      queryValue: titleSelectOptions.queryValue
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const titleSelectOptions = this.createFromForm();
    if (titleSelectOptions.id !== undefined) {
      this.subscribeToSaveResponse(this.titleSelectOptionsService.update(titleSelectOptions));
    } else {
      this.subscribeToSaveResponse(this.titleSelectOptionsService.create(titleSelectOptions));
    }
  }

  private createFromForm(): ITitleSelectOptions {
    return {
      ...new TitleSelectOptions(),
      id: this.editForm.get(['id']).value,
      transactionId: this.editForm.get(['transactionId']).value,
      queryField: this.editForm.get(['queryField']).value,
      queryValue: this.editForm.get(['queryValue']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITitleSelectOptions>>) {
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
