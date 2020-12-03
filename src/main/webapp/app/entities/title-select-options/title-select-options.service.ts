import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITitleSelectOptions } from 'app/shared/model/title-select-options.model';

type EntityResponseType = HttpResponse<ITitleSelectOptions>;
type EntityArrayResponseType = HttpResponse<ITitleSelectOptions[]>;

@Injectable({ providedIn: 'root' })
export class TitleSelectOptionsService {
  public resourceUrl = SERVER_API_URL + 'api/title-select-options';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/title-select-options';

  constructor(protected http: HttpClient) {}

  create(titleSelectOptions: ITitleSelectOptions): Observable<EntityResponseType> {
    return this.http.post<ITitleSelectOptions>(this.resourceUrl, titleSelectOptions, { observe: 'response' });
  }

  update(titleSelectOptions: ITitleSelectOptions): Observable<EntityResponseType> {
    return this.http.put<ITitleSelectOptions>(this.resourceUrl, titleSelectOptions, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITitleSelectOptions>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITitleSelectOptions[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITitleSelectOptions[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
