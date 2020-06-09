import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISurveyor } from 'app/shared/model/surveyor.model';

type EntityResponseType = HttpResponse<ISurveyor>;
type EntityArrayResponseType = HttpResponse<ISurveyor[]>;

@Injectable({ providedIn: 'root' })
export class SurveyorService {
  public resourceUrl = SERVER_API_URL + 'api/surveyors';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/surveyors';

  constructor(protected http: HttpClient) {}

  create(surveyor: ISurveyor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(surveyor);
    return this.http
      .post<ISurveyor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(surveyor: ISurveyor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(surveyor);
    return this.http
      .put<ISurveyor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISurveyor>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISurveyor[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISurveyor[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(surveyor: ISurveyor): ISurveyor {
    const copy: ISurveyor = Object.assign({}, surveyor, {
      requestDate: surveyor.requestDate != null && surveyor.requestDate.isValid() ? surveyor.requestDate.format(DATE_FORMAT) : null,
      processedDate: surveyor.processedDate != null && surveyor.processedDate.isValid() ? surveyor.processedDate.format(DATE_FORMAT) : null
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
      res.body.forEach((surveyor: ISurveyor) => {
        surveyor.requestDate = surveyor.requestDate != null ? moment(surveyor.requestDate) : null;
        surveyor.processedDate = surveyor.processedDate != null ? moment(surveyor.processedDate) : null;
      });
    }
    return res;
  }
}
