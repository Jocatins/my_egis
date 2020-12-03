import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDocumentRequest } from 'app/shared/model/document-request.model';

type EntityResponseType = HttpResponse<IDocumentRequest>;
type EntityArrayResponseType = HttpResponse<IDocumentRequest[]>;

@Injectable({ providedIn: 'root' })
export class DocumentRequestService {
  public resourceUrl = SERVER_API_URL + 'api/document-requests';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/document-requests';

  constructor(protected http: HttpClient) {}

  create(documentRequest: IDocumentRequest): Observable<EntityResponseType> {
    return this.http.post<IDocumentRequest>(this.resourceUrl, documentRequest, { observe: 'response' });
  }

  update(documentRequest: IDocumentRequest): Observable<EntityResponseType> {
    return this.http.put<IDocumentRequest>(this.resourceUrl, documentRequest, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDocumentRequest>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDocumentRequest[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDocumentRequest[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
