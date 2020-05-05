import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SupportingDocumentService } from 'app/entities/supporting-document/supporting-document.service';
import { ISupportingDocument, SupportingDocument } from 'app/shared/model/supporting-document.model';

describe('Service Tests', () => {
  describe('SupportingDocument Service', () => {
    let injector: TestBed;
    let service: SupportingDocumentService;
    let httpMock: HttpTestingController;
    let elemDefault: ISupportingDocument;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(SupportingDocumentService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new SupportingDocument(
        0,
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            date: currentDate.format(DATE_FORMAT)
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

      it('should create a SupportingDocument', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            date: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            date: currentDate
          },
          returnedFromService
        );
        service
          .create(new SupportingDocument(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a SupportingDocument', () => {
        const returnedFromService = Object.assign(
          {
            documentNumber: 'BBBBBB',
            ownershipArea: 'BBBBBB',
            pageCount: 1,
            status: 'BBBBBB',
            provided: 'BBBBBB',
            type: 1,
            name: 'BBBBBB',
            fileSize: 1,
            content: 'BBBBBB',
            contentUrl: 'BBBBBB',
            image: 'BBBBBB',
            date: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate
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

      it('should return a list of SupportingDocument', () => {
        const returnedFromService = Object.assign(
          {
            documentNumber: 'BBBBBB',
            ownershipArea: 'BBBBBB',
            pageCount: 1,
            status: 'BBBBBB',
            provided: 'BBBBBB',
            type: 1,
            name: 'BBBBBB',
            fileSize: 1,
            content: 'BBBBBB',
            contentUrl: 'BBBBBB',
            image: 'BBBBBB',
            date: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            date: currentDate
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

      it('should delete a SupportingDocument', () => {
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
