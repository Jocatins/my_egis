import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SurveyorService } from 'app/entities/surveyor/surveyor.service';
import { ISurveyor, Surveyor } from 'app/shared/model/surveyor.model';

describe('Service Tests', () => {
  describe('Surveyor Service', () => {
    let injector: TestBed;
    let service: SurveyorService;
    let httpMock: HttpTestingController;
    let elemDefault: ISurveyor;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(SurveyorService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Surveyor(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            requestDate: currentDate.format(DATE_FORMAT),
            processedDate: currentDate.format(DATE_FORMAT)
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

      it('should create a Surveyor', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            requestDate: currentDate.format(DATE_FORMAT),
            processedDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            requestDate: currentDate,
            processedDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new Surveyor(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Surveyor', () => {
        const returnedFromService = Object.assign(
          {
            email: 'BBBBBB',
            surconNumber: 'BBBBBB',
            registrationNumber: 'BBBBBB',
            phone: 'BBBBBB',
            status: 'BBBBBB',
            requestDate: currentDate.format(DATE_FORMAT),
            processedDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            requestDate: currentDate,
            processedDate: currentDate
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

      it('should return a list of Surveyor', () => {
        const returnedFromService = Object.assign(
          {
            email: 'BBBBBB',
            surconNumber: 'BBBBBB',
            registrationNumber: 'BBBBBB',
            phone: 'BBBBBB',
            status: 'BBBBBB',
            requestDate: currentDate.format(DATE_FORMAT),
            processedDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            requestDate: currentDate,
            processedDate: currentDate
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

      it('should delete a Surveyor', () => {
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
