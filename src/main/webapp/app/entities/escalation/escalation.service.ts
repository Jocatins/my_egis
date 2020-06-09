import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEscalation } from 'app/shared/model/escalation.model';

type EntityResponseType = HttpResponse<IEscalation>;
type EntityArrayResponseType = HttpResponse<IEscalation[]>;

@Injectable({ providedIn: 'root' })
export class EscalationService {
  public resourceUrl = SERVER_API_URL + 'api/escalations';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/escalations';

  constructor(protected http: HttpClient) {}

  create(escalation: IEscalation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(escalation);
    return this.http
      .post<IEscalation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(escalation: IEscalation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(escalation);
    return this.http
      .put<IEscalation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEscalation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEscalation[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEscalation[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(escalation: IEscalation): IEscalation {
    const copy: IEscalation = Object.assign({}, escalation, {
      escalateDate:
        escalation.escalateDate != null && escalation.escalateDate.isValid() ? escalation.escalateDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.escalateDate = res.body.escalateDate != null ? moment(res.body.escalateDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((escalation: IEscalation) => {
        escalation.escalateDate = escalation.escalateDate != null ? moment(escalation.escalateDate) : null;
      });
    }
    return res;
  }
}
