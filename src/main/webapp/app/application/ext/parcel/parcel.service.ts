import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IParcel } from 'app/shared/model/parcel.model';

type EntityResponseType = HttpResponse<IParcel>;
type EntityArrayResponseType = HttpResponse<IParcel[]>;

@Injectable({ providedIn: 'root' })
export class ParcelService {
  public resourceUrl = SERVER_API_URL + 'api/parcels';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/parcels';

  constructor(protected http: HttpClient) {}

  create(parcel: IParcel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(parcel);
    return this.http
      .post<IParcel>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(parcel: IParcel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(parcel);
    return this.http
      .put<IParcel>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IParcel>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IParcel[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IParcel[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(parcel: IParcel): IParcel {
    const copy: IParcel = Object.assign({}, parcel, {
      surveyDate: parcel.surveyDate != null && parcel.surveyDate.isValid() ? parcel.surveyDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.surveyDate = res.body.surveyDate != null ? moment(res.body.surveyDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((parcel: IParcel) => {
        parcel.surveyDate = parcel.surveyDate != null ? moment(parcel.surveyDate) : null;
      });
    }
    return res;
  }
}
