import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITransactionExt } from 'app/shared/model/transaction-ext.model';

type EntityResponseType = HttpResponse<ITransactionExt>;
type EntityArrayResponseType = HttpResponse<ITransactionExt[]>;

@Injectable({ providedIn: 'root' })
export class TransactionExtService {
  public resourceUrl = SERVER_API_URL + 'api/transaction-exts';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/transaction-exts';

  constructor(protected http: HttpClient) {}

  create(transactionExt: ITransactionExt): Observable<EntityResponseType> {
    return this.http.post<ITransactionExt>(this.resourceUrl, transactionExt, { observe: 'response' });
  }

  update(transactionExt: ITransactionExt): Observable<EntityResponseType> {
    return this.http.put<ITransactionExt>(this.resourceUrl, transactionExt, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITransactionExt>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITransactionExt[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITransactionExt[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
