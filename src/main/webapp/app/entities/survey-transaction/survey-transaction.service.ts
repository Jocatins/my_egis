import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISurveyTransaction } from 'app/shared/model/survey-transaction.model';

type EntityResponseType = HttpResponse<ISurveyTransaction>;
type EntityArrayResponseType = HttpResponse<ISurveyTransaction[]>;

@Injectable({ providedIn: 'root' })
export class SurveyTransactionService {
  public resourceUrl = SERVER_API_URL + 'api/survey-transactions';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/survey-transactions';

  constructor(protected http: HttpClient) {}

  create(surveyTransaction: ISurveyTransaction): Observable<EntityResponseType> {
    return this.http.post<ISurveyTransaction>(this.resourceUrl, surveyTransaction, { observe: 'response' });
  }

  update(surveyTransaction: ISurveyTransaction): Observable<EntityResponseType> {
    return this.http.put<ISurveyTransaction>(this.resourceUrl, surveyTransaction, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISurveyTransaction>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISurveyTransaction[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISurveyTransaction[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
