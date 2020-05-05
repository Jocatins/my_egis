import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.post<ISurveyor>(this.resourceUrl, surveyor, { observe: 'response' });
  }

  update(surveyor: ISurveyor): Observable<EntityResponseType> {
    return this.http.put<ISurveyor>(this.resourceUrl, surveyor, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISurveyor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISurveyor[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISurveyor[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
