import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMetadata } from 'app/shared/model/metadata.model';

type EntityResponseType = HttpResponse<IMetadata>;
type EntityArrayResponseType = HttpResponse<IMetadata[]>;

@Injectable({ providedIn: 'root' })
export class MetadataService {
  public resourceUrl = SERVER_API_URL + 'api/metadata';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/metadata';

  constructor(protected http: HttpClient) {}

  create(metadata: IMetadata): Observable<EntityResponseType> {
    return this.http.post<IMetadata>(this.resourceUrl, metadata, { observe: 'response' });
  }

  update(metadata: IMetadata): Observable<EntityResponseType> {
    return this.http.put<IMetadata>(this.resourceUrl, metadata, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMetadata>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMetadata[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMetadata[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
