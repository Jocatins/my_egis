import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IParty } from 'app/shared/model/party.model';

type EntityResponseType = HttpResponse<IParty>;
type EntityArrayResponseType = HttpResponse<IParty[]>;

@Injectable({ providedIn: 'root' })
export class PartyService {
  public resourceUrl = SERVER_API_URL + 'api/parties';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/parties';

  constructor(protected http: HttpClient) {}

  create(party: IParty): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(party);
    return this.http
      .post<IParty>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(party: IParty): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(party);
    return this.http
      .put<IParty>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IParty>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IParty[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IParty[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(party: IParty): IParty {
    const copy: IParty = Object.assign({}, party, {
      personIdDate: party.personIdDate != null && party.personIdDate.isValid() ? party.personIdDate.format(DATE_FORMAT) : null,
      personIdExpirationDate:
        party.personIdExpirationDate != null && party.personIdExpirationDate.isValid()
          ? party.personIdExpirationDate.format(DATE_FORMAT)
          : null,
      birthDate: party.birthDate != null && party.birthDate.isValid() ? party.birthDate.format(DATE_FORMAT) : null,
      iDDocumentIssuedDate:
        party.iDDocumentIssuedDate != null && party.iDDocumentIssuedDate.isValid() ? party.iDDocumentIssuedDate.format(DATE_FORMAT) : null,
      iDDocumentExpirationDate:
        party.iDDocumentExpirationDate != null && party.iDDocumentExpirationDate.isValid()
          ? party.iDDocumentExpirationDate.format(DATE_FORMAT)
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.personIdDate = res.body.personIdDate != null ? moment(res.body.personIdDate) : null;
      res.body.personIdExpirationDate = res.body.personIdExpirationDate != null ? moment(res.body.personIdExpirationDate) : null;
      res.body.birthDate = res.body.birthDate != null ? moment(res.body.birthDate) : null;
      res.body.iDDocumentIssuedDate = res.body.iDDocumentIssuedDate != null ? moment(res.body.iDDocumentIssuedDate) : null;
      res.body.iDDocumentExpirationDate = res.body.iDDocumentExpirationDate != null ? moment(res.body.iDDocumentExpirationDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((party: IParty) => {
        party.personIdDate = party.personIdDate != null ? moment(party.personIdDate) : null;
        party.personIdExpirationDate = party.personIdExpirationDate != null ? moment(party.personIdExpirationDate) : null;
        party.birthDate = party.birthDate != null ? moment(party.birthDate) : null;
        party.iDDocumentIssuedDate = party.iDDocumentIssuedDate != null ? moment(party.iDDocumentIssuedDate) : null;
        party.iDDocumentExpirationDate = party.iDDocumentExpirationDate != null ? moment(party.iDDocumentExpirationDate) : null;
      });
    }
    return res;
  }
}
