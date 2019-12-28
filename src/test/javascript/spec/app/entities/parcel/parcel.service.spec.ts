import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ParcelService } from 'app/entities/parcel/parcel.service';
import { IParcel, Parcel } from 'app/shared/model/parcel.model';

describe('Service Tests', () => {
  describe('Parcel Service', () => {
    let injector: TestBed;
    let service: ParcelService;
    let httpMock: HttpTestingController;
    let elemDefault: IParcel;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(ParcelService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Parcel(
        0,
        'AAAAAAA',
        0,
        0,
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        0,
        'AAAAAAA',
        0,
        'AAAAAAA',
        0,
        0,
        0,
        'AAAAAAA',
        0,
        'AAAAAAA',
        0,
        0,
        0,
        0,
        0,
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            surveyDate: currentDate.format(DATE_FORMAT)
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

      it('should create a Parcel', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            surveyDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            surveyDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new Parcel(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Parcel', () => {
        const returnedFromService = Object.assign(
          {
            label: 'BBBBBB',
            area: 1,
            spatialUnitType: 1,
            registrationOfficeDictionary: 'BBBBBB',
            surveyType: 'BBBBBB',
            surveyDate: currentDate.format(DATE_FORMAT),
            propertyType: 1,
            accommodation: 'BBBBBB',
            tenureType: 1,
            description: 'BBBBBB',
            propertyArea: 1,
            location: 1,
            builtUpAreaType: 1,
            planNumber: 'BBBBBB',
            measurementUnitType: 1,
            premiumValue: 'BBBBBB',
            landUseCategory: 1,
            landUseType: 1,
            developmentStatus: 1,
            coordinateN: 1,
            coordinateS: 1,
            lagosSheetNumber: 'BBBBBB',
            allocation: 'BBBBBB',
            location1: 1,
            unitNumber: 'BBBBBB',
            name: 'BBBBBB',
            registerType: 1,
            valuation: 'BBBBBB',
            comments: 'BBBBBB',
            legalDescription: 'BBBBBB',
            meansOfAcq: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            surveyDate: currentDate
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

      it('should return a list of Parcel', () => {
        const returnedFromService = Object.assign(
          {
            label: 'BBBBBB',
            area: 1,
            spatialUnitType: 1,
            registrationOfficeDictionary: 'BBBBBB',
            surveyType: 'BBBBBB',
            surveyDate: currentDate.format(DATE_FORMAT),
            propertyType: 1,
            accommodation: 'BBBBBB',
            tenureType: 1,
            description: 'BBBBBB',
            propertyArea: 1,
            location: 1,
            builtUpAreaType: 1,
            planNumber: 'BBBBBB',
            measurementUnitType: 1,
            premiumValue: 'BBBBBB',
            landUseCategory: 1,
            landUseType: 1,
            developmentStatus: 1,
            coordinateN: 1,
            coordinateS: 1,
            lagosSheetNumber: 'BBBBBB',
            allocation: 'BBBBBB',
            location1: 1,
            unitNumber: 'BBBBBB',
            name: 'BBBBBB',
            registerType: 1,
            valuation: 'BBBBBB',
            comments: 'BBBBBB',
            legalDescription: 'BBBBBB',
            meansOfAcq: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            surveyDate: currentDate
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

      it('should delete a Parcel', () => {
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
