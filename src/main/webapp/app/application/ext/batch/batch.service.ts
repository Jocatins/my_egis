import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { IBatch } from 'app/shared/model/batch.model';
import { createRequestOption } from 'app/shared/util/request-util';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';

type EntityResponseType = HttpResponse<IBatch>;
type EntityArrayResponseType = HttpResponse<IBatch[]>;

@Injectable({ providedIn: 'root' })
export class BatchService {
  public static serverApiURL = SERVER_API_URL;
  public resourceUrl = SERVER_API_URL + 'api/batches';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/batches';

  constructor(protected http: HttpClient) {}

  create(batch: IBatch): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(batch);
    return this.http
      .post<IBatch>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(batch: IBatch): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(batch);
    return this.http
      .put<IBatch>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBatch>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBatch[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBatch[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(batch: IBatch): IBatch {
    const copy: IBatch = Object.assign({}, batch, {
      createDate: batch.createDate != null && batch.createDate.isValid() ? batch.createDate.format(DATE_FORMAT) : null,
      deliveryDate: batch.deliveryDate != null && batch.deliveryDate.isValid() ? batch.deliveryDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
      res.body.deliveryDate = res.body.deliveryDate != null ? moment(res.body.deliveryDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((batch: IBatch) => {
        batch.createDate = batch.createDate != null ? moment(batch.createDate) : null;
        batch.deliveryDate = batch.deliveryDate != null ? moment(batch.deliveryDate) : null;
      });
    }
    return res;
  }

  protected convertDateArrayFromServerOLD(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((batch: IBatch) => {
        batch.createDate = batch.createDate != null ? moment(batch.createDate) : null;
        batch.deliveryDate = batch.deliveryDate != null ? moment(batch.deliveryDate) : null;

        const code = batch.transactions[0].transactionCode;

        const simpleresourceUrl = SERVER_API_URL + 'api/backoffice/transmeatada?code=' + code;
        const callMetadata = this.http.get<any>(`${simpleresourceUrl}`);
        if (callMetadata !== null) {
          callMetadata
            .pipe(
              timeout(2000),
              catchError(ee => {
                return null;
              })
            )
            .subscribe((dataMeta: any) => {
              batch.moreData = code + ' - ' + JSON.parse(dataMeta.metadata).descr;
            });
        }
      });
    }
    return res;
  }
}
