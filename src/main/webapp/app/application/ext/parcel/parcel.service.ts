import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.post<IParcel>(this.resourceUrl, parcel, { observe: 'response' });
  }

  update(parcel: IParcel): Observable<EntityResponseType> {
    return this.http.put<IParcel>(this.resourceUrl, parcel, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IParcel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IParcel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IParcel[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
