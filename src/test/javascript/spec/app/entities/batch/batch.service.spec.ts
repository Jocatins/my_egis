import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { BatchService } from 'app/entities/batch/batch.service';
import { IBatch, Batch } from 'app/shared/model/batch.model';

describe('Service Tests', () => {
  describe('Batch Service', () => {
    let injector: TestBed;
    let service: BatchService;
    let httpMock: HttpTestingController;
    let elemDefault: IBatch;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(BatchService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Batch(0, 0, 0, 'AAAAAAA', currentDate, currentDate, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            createDate: currentDate.format(DATE_FORMAT),
            deliveryDate: currentDate.format(DATE_FORMAT)
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

      it('should create a Batch', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            createDate: currentDate.format(DATE_FORMAT),
            deliveryDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            createDate: currentDate,
            deliveryDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new Batch(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Batch', () => {
        const returnedFromService = Object.assign(
          {
            batchNumber: 1,
            batchStatus: 1,
            invoiceNumber: 'BBBBBB',
            createDate: currentDate.format(DATE_FORMAT),
            deliveryDate: currentDate.format(DATE_FORMAT),
            officeId: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createDate: currentDate,
            deliveryDate: currentDate
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

      it('should return a list of Batch', () => {
        const returnedFromService = Object.assign(
          {
            batchNumber: 1,
            batchStatus: 1,
            invoiceNumber: 'BBBBBB',
            createDate: currentDate.format(DATE_FORMAT),
            deliveryDate: currentDate.format(DATE_FORMAT),
            officeId: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            createDate: currentDate,
            deliveryDate: currentDate
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

      it('should delete a Batch', () => {
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
