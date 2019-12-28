import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITransaction } from 'app/shared/model/transaction.model';

type EntityResponseType = HttpResponse<ITransaction>;
type EntityArrayResponseType = HttpResponse<ITransaction[]>;

@Injectable({ providedIn: 'root' })
export class TransactionService {
  public resourceUrl = SERVER_API_URL + 'api/transactions';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/transactions';

  constructor(protected http: HttpClient) {}

  create(transaction: ITransaction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transaction);
    return this.http
      .post<ITransaction>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(transaction: ITransaction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transaction);
    return this.http
      .put<ITransaction>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITransaction>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITransaction[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITransaction[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(transaction: ITransaction): ITransaction {
    const copy: ITransaction = Object.assign({}, transaction, {
      applicationDate:
        transaction.applicationDate != null && transaction.applicationDate.isValid()
          ? transaction.applicationDate.format(DATE_FORMAT)
          : null,
      transactionStartDate:
        transaction.transactionStartDate != null && transaction.transactionStartDate.isValid()
          ? transaction.transactionStartDate.format(DATE_FORMAT)
          : null,
      createDate: transaction.createDate != null && transaction.createDate.isValid() ? transaction.createDate.format(DATE_FORMAT) : null,
      startDate: transaction.startDate != null && transaction.startDate.isValid() ? transaction.startDate.format(DATE_FORMAT) : null,
      completeDate:
        transaction.completeDate != null && transaction.completeDate.isValid() ? transaction.completeDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.applicationDate = res.body.applicationDate != null ? moment(res.body.applicationDate) : null;
      res.body.transactionStartDate = res.body.transactionStartDate != null ? moment(res.body.transactionStartDate) : null;
      res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
      res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
      res.body.completeDate = res.body.completeDate != null ? moment(res.body.completeDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((transaction: ITransaction) => {
        transaction.applicationDate = transaction.applicationDate != null ? moment(transaction.applicationDate) : null;
        transaction.transactionStartDate = transaction.transactionStartDate != null ? moment(transaction.transactionStartDate) : null;
        transaction.createDate = transaction.createDate != null ? moment(transaction.createDate) : null;
        transaction.startDate = transaction.startDate != null ? moment(transaction.startDate) : null;
        transaction.completeDate = transaction.completeDate != null ? moment(transaction.completeDate) : null;
      });
    }
    return res;
  }
}
