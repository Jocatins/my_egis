import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISupportingDocument } from 'app/shared/model/supporting-document.model';

type EntityResponseType = HttpResponse<ISupportingDocument>;
type EntityArrayResponseType = HttpResponse<ISupportingDocument[]>;

@Injectable({ providedIn: 'root' })
export class SupportingDocumentService {
  public resourceUrl = SERVER_API_URL + 'api/supporting-documents';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/supporting-documents';

  constructor(protected http: HttpClient) {}

  create(supportingDocument: ISupportingDocument): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(supportingDocument);
    return this.http
      .post<ISupportingDocument>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(supportingDocument: ISupportingDocument): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(supportingDocument);
    return this.http
      .put<ISupportingDocument>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISupportingDocument>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISupportingDocument[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISupportingDocument[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(supportingDocument: ISupportingDocument): ISupportingDocument {
    const copy: ISupportingDocument = Object.assign({}, supportingDocument, {
      date: supportingDocument.date != null && supportingDocument.date.isValid() ? supportingDocument.date.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date != null ? moment(res.body.date) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((supportingDocument: ISupportingDocument) => {
        supportingDocument.date = supportingDocument.date != null ? moment(supportingDocument.date) : null;
      });
    }
    return res;
  }
}
