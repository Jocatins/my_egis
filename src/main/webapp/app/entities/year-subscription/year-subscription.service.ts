import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IYearSubscription } from 'app/shared/model/year-subscription.model';

type EntityResponseType = HttpResponse<IYearSubscription>;
type EntityArrayResponseType = HttpResponse<IYearSubscription[]>;

@Injectable({ providedIn: 'root' })
export class YearSubscriptionService {
  public resourceUrl = SERVER_API_URL + 'api/year-subscriptions';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/year-subscriptions';

  constructor(protected http: HttpClient) {}

  create(yearSubscription: IYearSubscription): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(yearSubscription);
    return this.http
      .post<IYearSubscription>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(yearSubscription: IYearSubscription): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(yearSubscription);
    return this.http
      .put<IYearSubscription>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IYearSubscription>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IYearSubscription[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IYearSubscription[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(yearSubscription: IYearSubscription): IYearSubscription {
    const copy: IYearSubscription = Object.assign({}, yearSubscription, {
      requestDate:
        yearSubscription.requestDate != null && yearSubscription.requestDate.isValid()
          ? yearSubscription.requestDate.format(DATE_FORMAT)
          : null,
      processedDate:
        yearSubscription.processedDate != null && yearSubscription.processedDate.isValid()
          ? yearSubscription.processedDate.format(DATE_FORMAT)
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.requestDate = res.body.requestDate != null ? moment(res.body.requestDate) : null;
      res.body.processedDate = res.body.processedDate != null ? moment(res.body.processedDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((yearSubscription: IYearSubscription) => {
        yearSubscription.requestDate = yearSubscription.requestDate != null ? moment(yearSubscription.requestDate) : null;
        yearSubscription.processedDate = yearSubscription.processedDate != null ? moment(yearSubscription.processedDate) : null;
      });
    }
    return res;
  }
}
