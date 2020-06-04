import { HttpClient, HttpResponse, HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IBatch } from 'app/shared/model/batch.model';
import { IEGISDIctionary } from 'app/application/model/egisdictionary.model';

type EntityResponseType = HttpResponse<IBatch>;
type EntityArrayResponseType = HttpResponse<IBatch[]>;

@Injectable({ providedIn: 'root' })
export class DashboardService {
  static spatialUnitLinkTypes: IEGISDIctionary[];
  static landUseCategorys: IEGISDIctionary[];
  static propertyTypes: IEGISDIctionary[];
  static locationOfLands: IEGISDIctionary[];
  static builtUpAreaTypes: IEGISDIctionary[];
  static measurementTypes: IEGISDIctionary[];
  static landUseTypes: IEGISDIctionary[];
  static developmentStatus: IEGISDIctionary[];
  static tenureTypes: IEGISDIctionary[];
  static typeOfAccomodations: IEGISDIctionary[];

  static states: IEGISDIctionary[];
  static partyTypes: IEGISDIctionary[];
  static partyRoleTypes: IEGISDIctionary[];
  static partySubRoleTypes: IEGISDIctionary[];
  static deliveryTypes: IEGISDIctionary[];
  static personIdTypes: IEGISDIctionary[];
  static personTypes: IEGISDIctionary[];
  static emailTypes: IEGISDIctionary[];
  static issued_bys: IEGISDIctionary[];
  static issuedBys: IEGISDIctionary[];
  static personTitles: IEGISDIctionary[];
  static genders: IEGISDIctionary[];
  static natureOfBuss: IEGISDIctionary[];
  static legalRoles: IEGISDIctionary[];

  public resourceUrl = SERVER_API_URL + 'api/batches';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/batches';
  public serverApiURL = SERVER_API_URL + 'GET /api/backoffice/';

  constructor(protected http: HttpClient
    ) {

  }

  getTransInfo(param: string, transCode: string) {
    return this.http.get<any>(`${this.serverApiURL + 'transinfo'}/?param=${param}&transCode=${transCode}`, { observe: 'response' });
    //      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  getTransMetadata(code: string) {
    this.serverApiURL = '/api/metadata/';
    return this.http.get<any>(`${this.serverApiURL + 'getByCode'}/?code=${code}`, { observe: 'response' });
  }

  public fetchDictionaryValuesObj(category: string) {
    this.serverApiURL = '/api/backoffice/';
    return this.http.get<any>(`${this.serverApiURL + 'fetchDictionaryValuesObj'}?category=${category}`, { observe: 'response' });
  }

  public transinfoWithGroup(group: string) {
    this.serverApiURL = '/api/backoffice/';
    return this.http.get<any>(`${this.serverApiURL + 'transinfoWithGroup'}?group=${group}`, { observe: 'response' });
  }

  public getMandatorySupportDocs(code: string) {
    this.serverApiURL = '/api/backoffice/';
    return this.http.get<any>(`${this.serverApiURL + 'getMandatorySupportDocs'}?code=${code}`, { observe: 'response' });
  }

  // c.l.e.e.aop.logging.LoggingAspect
  //
  public downloadWithMore(transCode: string, laApplication: string, laAgent: string, usrMultiInd: number, usrMutliOrg: number) {
    const strUrl = `/api/backoffice/downloadWithMore?laAgent=${laAgent}&laApplication=${laApplication}&transCode=${transCode}&usrMultiInd=${usrMultiInd}&usrMutliOrg=${usrMutliOrg}`;
    // alert(strUrl)
    return this.http.get<any>(strUrl, { observe: 'response' });
  }

  public downloadForm(transCode: string, complexParam: string) {
    this.serverApiURL = '/api/backoffice/';

    const strUrl = `${this.serverApiURL + 'download'}?param=${complexParam}&transCode=${transCode}`;
    //const strUrl =`/api/backoffice/download?param=LA_APPLICATION_TYPE%255EIndividual%257CLA_AGENT%255Etrue%257CUSR_MULTIPARTY_INDIVIDUAL_COUNT%255E2%257CUSR_MULTIPARTY_ORGANISATION_COUNT%255E2&transCode=AOSL`;
    //const strUrl =`/api/backoffice/download?transCode=AOSL&param=LA_APPLICATION_TYPE%5EIndividual%7CLA_AGENT%5Etrue%7CUSR_MULTIPARTY_INDIVIDUAL_COUNT%5E2%7CUSR_MULTIPARTY_ORGANISATION_COUNT%5E2`;

    //alert(strUrl)
    return this.http.get<any>(strUrl, { observe: 'response' });
  }

  // public filedownloadForm(transCode: string, complexParam: string)  {
  //   this.serverApiURL ='/api/backoffice/';

  //   //alert(`${this.serverApiURL + 'download'}?param=${complexParam}&transCode=${transCode}`);
  // const strUrl =`/api/backoffice/filedownload?param=LA_APPLICATION_TYPE%255EIndividual%257CLA_AGENT%255Etrue%257CUSR_MULTIPARTY_INDIVIDUAL_COUNT%255E2%257CUSR_MULTIPARTY_ORGANISATION_COUNT%255E2&transCode=AOSL`;
  //   //const strUrl =`http://localhost:7777/forms/filedownload?sheetName=AOSL&complexParams=LA_APPLICATION_TYPE%5EIndividual%7CLA_AGENT%5Etrue%7CUSR_MULTIPARTY_INDIVIDUAL_COUNT%5E2%7CUSR_MULTIPARTY_ORGANISATION_COUNT%5E2`
  //   return this.http
  //     .get<any>(strUrl, { observe: 'response' })
  // }
}
