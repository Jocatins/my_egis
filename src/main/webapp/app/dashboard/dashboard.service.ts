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
import { IBOTranInfo } from 'app/application/model/botraninfo.model';


type EntityResponseType = HttpResponse<IBatch>;
type EntityArrayResponseType = HttpResponse<IBatch[]>;

@Injectable({ providedIn: 'root' })
export class DashboardService {
  public resourceUrl = SERVER_API_URL + 'api/batches';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/batches';
  public serverApiURL = SERVER_API_URL + 'GET /api/backoffice/';

  constructor(protected http: HttpClient){
  }

  getTransInfo(param: string, transCode: string)  {
    return this.http
      .get<any>(`${this.serverApiURL + 'transinfo'}/?param=${param}&transCode=${transCode}`, { observe: 'response' })
      //      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  getTransMetadata(code: string)  {
    this.serverApiURL ='/api/backoffice/';
    return this.http
      .get<any>(`${this.serverApiURL + 'transmetadata'}/?code=${code}`, { observe: 'response' })
  }

  public fetchDictionaryValuesObj(category: string)  {
    this.serverApiURL ='/api/backoffice/';
    return this.http
      .get<any>(`${this.serverApiURL + 'fetchDictionaryValuesObj'}?category=${category}`, { observe: 'response' })
  }


}
