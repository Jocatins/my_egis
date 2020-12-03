import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import { DocumentRequestService } from 'app/entities/document-request/document-request.service';
import { IDocumentRequest, DocumentRequest } from 'app/shared/model/document-request.model';

describe('Service Tests', () => {
  describe('DocumentRequest Service', () => {
    let injector: TestBed;
    let service: DocumentRequestService;
    let httpMock: HttpTestingController;
    let elemDefault: IDocumentRequest;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(DocumentRequestService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new DocumentRequest(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
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

      it('should create a DocumentRequest', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new DocumentRequest(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a DocumentRequest', () => {
        const returnedFromService = Object.assign(
          {
            transactionId: 'BBBBBB',
            documentId: 'BBBBBB',
            documentType: 'BBBBBB',
            documentSubType: 'BBBBBB',
            documentNumber: 'BBBBBB',
            surveyPlanNumber: 'BBBBBB',
            propertyDescription: 'BBBBBB',
            titleNumber: 'BBBBBB'
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

      it('should return a list of DocumentRequest', () => {
        const returnedFromService = Object.assign(
          {
            transactionId: 'BBBBBB',
            documentId: 'BBBBBB',
            documentType: 'BBBBBB',
            documentSubType: 'BBBBBB',
            documentNumber: 'BBBBBB',
            surveyPlanNumber: 'BBBBBB',
            propertyDescription: 'BBBBBB',
            titleNumber: 'BBBBBB'
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

      it('should delete a DocumentRequest', () => {
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
