import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import { ParcelService } from 'app/entities/parcel/parcel.service';
import { IParcel, Parcel } from 'app/shared/model/parcel.model';

describe('Service Tests', () => {
  describe('Parcel Service', () => {
    let injector: TestBed;
    let service: ParcelService;
    let httpMock: HttpTestingController;
    let elemDefault: IParcel;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(ParcelService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Parcel(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        0,
        'AAAAAAA',
        0,
        0,
        0,
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);
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
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
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
            propertyNumber: 'BBBBBB',
            parcelLineage: 'BBBBBB',
            surveyPlanNumber: 'BBBBBB',
            propertyDescription: 'BBBBBB',
            area: 1,
            description: 'BBBBBB',
            propertyArea: 1,
            planNumber: 'BBBBBB',
            premiumValue: 1,
            coordinateN: 1,
            coordinateE: 1,
            lagosSheetNumber: 'BBBBBB',
            unitNumber: 'BBBBBB',
            valuationAmount: 1,
            comments: 'BBBBBB',
            streetNumber: 'BBBBBB',
            streetName: 'BBBBBB',
            blockNumber: 'BBBBBB',
            plotNumber: 'BBBBBB',
            ward: 'BBBBBB',
            town: 'BBBBBB',
            district: 'BBBBBB',
            village: 'BBBBBB',
            upin: 'BBBBBB',
            comment: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
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
            propertyNumber: 'BBBBBB',
            parcelLineage: 'BBBBBB',
            surveyPlanNumber: 'BBBBBB',
            propertyDescription: 'BBBBBB',
            area: 1,
            description: 'BBBBBB',
            propertyArea: 1,
            planNumber: 'BBBBBB',
            premiumValue: 1,
            coordinateN: 1,
            coordinateE: 1,
            lagosSheetNumber: 'BBBBBB',
            unitNumber: 'BBBBBB',
            valuationAmount: 1,
            comments: 'BBBBBB',
            streetNumber: 'BBBBBB',
            streetName: 'BBBBBB',
            blockNumber: 'BBBBBB',
            plotNumber: 'BBBBBB',
            ward: 'BBBBBB',
            town: 'BBBBBB',
            district: 'BBBBBB',
            village: 'BBBBBB',
            upin: 'BBBBBB',
            comment: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
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
