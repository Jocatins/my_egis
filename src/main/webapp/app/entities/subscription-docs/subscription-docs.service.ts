import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISubscriptionDocs } from 'app/shared/model/subscription-docs.model';

type EntityResponseType = HttpResponse<ISubscriptionDocs>;
type EntityArrayResponseType = HttpResponse<ISubscriptionDocs[]>;

@Injectable({ providedIn: 'root' })
export class SubscriptionDocsService {
  public resourceUrl = SERVER_API_URL + 'api/subscription-docs';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/subscription-docs';

  constructor(protected http: HttpClient) {}

  create(subscriptionDocs: ISubscriptionDocs): Observable<EntityResponseType> {
    return this.http.post<ISubscriptionDocs>(this.resourceUrl, subscriptionDocs, { observe: 'response' });
  }

  update(subscriptionDocs: ISubscriptionDocs): Observable<EntityResponseType> {
    return this.http.put<ISubscriptionDocs>(this.resourceUrl, subscriptionDocs, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISubscriptionDocs>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISubscriptionDocs[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISubscriptionDocs[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
