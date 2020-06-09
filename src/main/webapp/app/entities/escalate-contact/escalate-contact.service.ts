import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEscalateContact } from 'app/shared/model/escalate-contact.model';

type EntityResponseType = HttpResponse<IEscalateContact>;
type EntityArrayResponseType = HttpResponse<IEscalateContact[]>;

@Injectable({ providedIn: 'root' })
export class EscalateContactService {
  public resourceUrl = SERVER_API_URL + 'api/escalate-contacts';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/escalate-contacts';

  constructor(protected http: HttpClient) {}

  create(escalateContact: IEscalateContact): Observable<EntityResponseType> {
    return this.http.post<IEscalateContact>(this.resourceUrl, escalateContact, { observe: 'response' });
  }

  update(escalateContact: IEscalateContact): Observable<EntityResponseType> {
    return this.http.put<IEscalateContact>(this.resourceUrl, escalateContact, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEscalateContact>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEscalateContact[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEscalateContact[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
