import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IUserExt, UserExt } from 'app/shared/model/user-ext.model';
import { UserExtService } from './user-ext.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-user-ext-update',
  templateUrl: './user-ext-update.component.html'
})
export class UserExtUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    payerId: [],
    phoneNumber: [],
    user: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected userExtService: UserExtService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ userExt }) => {
      this.updateForm(userExt);
    });
    this.userService
      .query()
      .subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(userExt: IUserExt) {
    this.editForm.patchValue({
      id: userExt.id,
      payerId: userExt.payerId,
      phoneNumber: userExt.phoneNumber,
      user: userExt.user
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const userExt = this.createFromForm();
    if (userExt.id !== undefined) {
      this.subscribeToSaveResponse(this.userExtService.update(userExt));
    } else {
      this.subscribeToSaveResponse(this.userExtService.create(userExt));
    }
  }

  private createFromForm(): IUserExt {
    return {
      ...new UserExt(),
      id: this.editForm.get(['id']).value,
      payerId: this.editForm.get(['payerId']).value,
      phoneNumber: this.editForm.get(['phoneNumber']).value,
      user: this.editForm.get(['user']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserExt>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
