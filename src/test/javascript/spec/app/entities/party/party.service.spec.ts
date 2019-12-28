import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { PartyService } from 'app/entities/party/party.service';
import { IParty, Party } from 'app/shared/model/party.model';

describe('Service Tests', () => {
  describe('Party Service', () => {
    let injector: TestBed;
    let service: PartyService;
    let httpMock: HttpTestingController;
    let elemDefault: IParty;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(PartyService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Party(
        0,
        0,
        0,
        0,
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        0,
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        currentDate,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        0,
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        0,
        'AAAAAAA',
        0,
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            personIdDate: currentDate.format(DATE_FORMAT),
            personIdExpirationDate: currentDate.format(DATE_FORMAT),
            birthDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Party', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            personIdDate: currentDate.format(DATE_FORMAT),
            personIdExpirationDate: currentDate.format(DATE_FORMAT),
            birthDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            personIdDate: currentDate,
            personIdExpirationDate: currentDate,
            birthDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new Party(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Party', () => {
        const returnedFromService = Object.assign(
          {
            partyType: 1,
            partyRoleType: 1,
            partySubRoleType: 1,
            deliveryType: 1,
            partyName: 'BBBBBB',
            shareNominator: 'BBBBBB',
            shareDenominator: 'BBBBBB',
            taxExempt: 'BBBBBB',
            primaryParty: 'BBBBBB',
            otherName: 'BBBBBB',
            personIdType: 1,
            personType: 1,
            fax: 'BBBBBB',
            email: 'BBBBBB',
            emailType: 1,
            phoneNumber: 'BBBBBB',
            payerId: 'BBBBBB',
            taxPayerNumber: 'BBBBBB',
            comments: 'BBBBBB',
            personIdIssuedBy: 1,
            personIdDate: currentDate.format(DATE_FORMAT),
            personIdExpirationDate: currentDate.format(DATE_FORMAT),
            rcNumber: 'BBBBBB',
            organization: 'BBBBBB',
            businessNature: 'BBBBBB',
            birthPlace: 'BBBBBB',
            birthDate: currentDate.format(DATE_FORMAT),
            personTitle: 1,
            gender: 1,
            firstName: 'BBBBBB',
            middleName: 'BBBBBB',
            lastName: 'BBBBBB',
            civilState: 1,
            driverLicenseRegion: 1,
            driverLicence: 'BBBBBB',
            representativeId: 1,
            professionRegNo: 'BBBBBB',
            occupation: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            personIdDate: currentDate,
            personIdExpirationDate: currentDate,
            birthDate: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Party', () => {
        const returnedFromService = Object.assign(
          {
            partyType: 1,
            partyRoleType: 1,
            partySubRoleType: 1,
            deliveryType: 1,
            partyName: 'BBBBBB',
            shareNominator: 'BBBBBB',
            shareDenominator: 'BBBBBB',
            taxExempt: 'BBBBBB',
            primaryParty: 'BBBBBB',
            otherName: 'BBBBBB',
            personIdType: 1,
            personType: 1,
            fax: 'BBBBBB',
            email: 'BBBBBB',
            emailType: 1,
            phoneNumber: 'BBBBBB',
            payerId: 'BBBBBB',
            taxPayerNumber: 'BBBBBB',
            comments: 'BBBBBB',
            personIdIssuedBy: 1,
            personIdDate: currentDate.format(DATE_FORMAT),
            personIdExpirationDate: currentDate.format(DATE_FORMAT),
            rcNumber: 'BBBBBB',
            organization: 'BBBBBB',
            businessNature: 'BBBBBB',
            birthPlace: 'BBBBBB',
            birthDate: currentDate.format(DATE_FORMAT),
            personTitle: 1,
            gender: 1,
            firstName: 'BBBBBB',
            middleName: 'BBBBBB',
            lastName: 'BBBBBB',
            civilState: 1,
            driverLicenseRegion: 1,
            driverLicence: 'BBBBBB',
            representativeId: 1,
            professionRegNo: 'BBBBBB',
            occupation: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            personIdDate: currentDate,
            personIdExpirationDate: currentDate,
            birthDate: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Party', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
