import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IDictionary, Dictionary } from 'app/shared/model/dictionary.model';
import { DictionaryService } from './dictionary.service';

@Component({
  selector: 'jhi-dictionary-update',
  templateUrl: './dictionary-update.component.html'
})
export class DictionaryUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    code: [],
    label: [],
    descr: [],
    category: []
  });

  constructor(protected dictionaryService: DictionaryService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ dictionary }) => {
      this.updateForm(dictionary);
    });
  }

  updateForm(dictionary: IDictionary) {
    this.editForm.patchValue({
      id: dictionary.id,
      code: dictionary.code,
      label: dictionary.label,
      descr: dictionary.descr,
      category: dictionary.category
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const dictionary = this.createFromForm();
    if (dictionary.id !== undefined) {
      this.subscribeToSaveResponse(this.dictionaryService.update(dictionary));
    } else {
      this.subscribeToSaveResponse(this.dictionaryService.create(dictionary));
    }
  }

  private createFromForm(): IDictionary {
    return {
      ...new Dictionary(),
      id: this.editForm.get(['id']).value,
      code: this.editForm.get(['code']).value,
      label: this.editForm.get(['label']).value,
      descr: this.editForm.get(['descr']).value,
      category: this.editForm.get(['category']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDictionary>>) {
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
