import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import { MetadataService } from 'app/entities/metadata/metadata.service';
import { IMetadata, Metadata } from 'app/shared/model/metadata.model';

describe('Service Tests', () => {
  describe('Metadata Service', () => {
    let injector: TestBed;
    let service: MetadataService;
    let httpMock: HttpTestingController;
    let elemDefault: IMetadata;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(MetadataService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Metadata(
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

      it('should create a Metadata', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new Metadata(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Metadata', () => {
        const returnedFromService = Object.assign(
          {
            hjtype: 'BBBBBB',
            code: 'BBBBBB',
            label: 'BBBBBB',
            descr: 'BBBBBB',
            category: 'BBBBBB',
            generalTerm: 'BBBBBB',
            sortOrder: 'BBBBBB',
            hidden: 'BBBBBB',
            groupName: 'BBBBBB',
            workflow: 'BBBBBB',
            groupCode: 'BBBBBB',
            normalDuration: 'BBBBBB',
            lapsedDuration: 'BBBBBB',
            maxDuration: 'BBBBBB',
            rightType: 'BBBBBB',
            rightTypeMultiple: 'BBBBBB',
            rightTypeOther: 'BBBBBB',
            createNewRrs: 'BBBBBB',
            modifyActiveRrrs: 'BBBBBB',
            relatedActiveRrrs: 'BBBBBB',
            dischargeActiveRrrs: 'BBBBBB',
            blockedActiveRrrs: 'BBBBBB',
            metaType: 'BBBBBB',
            sourcePartyType: 'BBBBBB',
            targetPartyType: 'BBBBBB',
            otherPartyType: 'BBBBBB',
            relatedTransactionCode: 'BBBBBB',
            cashierTransactionCode: 'BBBBBB',
            feePaymentCodes: 'BBBBBB',
            mandatoryDocsCodes: 'BBBBBB',
            mandatoryScanOutgoingDocsCodes: 'BBBBBB',
            createMutateProperty: 'BBBBBB',
            referencedProperties: 'BBBBBB',
            priorRequiredTransactions: 'BBBBBB',
            createNewParty: 'BBBBBB',
            partyBusinessRules: 'BBBBBB',
            reportTemplates: 'BBBBBB',
            detachable: 'BBBBBB',
            parentTransactionType: 'BBBBBB',
            internalCode: 'BBBBBB',
            version: 'BBBBBB',
            beginLifespanVersion: 'BBBBBB',
            endLifespanVersion: 'BBBBBB',
            tranIndex: 'BBBBBB'
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

      it('should return a list of Metadata', () => {
        const returnedFromService = Object.assign(
          {
            hjtype: 'BBBBBB',
            code: 'BBBBBB',
            label: 'BBBBBB',
            descr: 'BBBBBB',
            category: 'BBBBBB',
            generalTerm: 'BBBBBB',
            sortOrder: 'BBBBBB',
            hidden: 'BBBBBB',
            groupName: 'BBBBBB',
            workflow: 'BBBBBB',
            groupCode: 'BBBBBB',
            normalDuration: 'BBBBBB',
            lapsedDuration: 'BBBBBB',
            maxDuration: 'BBBBBB',
            rightType: 'BBBBBB',
            rightTypeMultiple: 'BBBBBB',
            rightTypeOther: 'BBBBBB',
            createNewRrs: 'BBBBBB',
            modifyActiveRrrs: 'BBBBBB',
            relatedActiveRrrs: 'BBBBBB',
            dischargeActiveRrrs: 'BBBBBB',
            blockedActiveRrrs: 'BBBBBB',
            metaType: 'BBBBBB',
            sourcePartyType: 'BBBBBB',
            targetPartyType: 'BBBBBB',
            otherPartyType: 'BBBBBB',
            relatedTransactionCode: 'BBBBBB',
            cashierTransactionCode: 'BBBBBB',
            feePaymentCodes: 'BBBBBB',
            mandatoryDocsCodes: 'BBBBBB',
            mandatoryScanOutgoingDocsCodes: 'BBBBBB',
            createMutateProperty: 'BBBBBB',
            referencedProperties: 'BBBBBB',
            priorRequiredTransactions: 'BBBBBB',
            createNewParty: 'BBBBBB',
            partyBusinessRules: 'BBBBBB',
            reportTemplates: 'BBBBBB',
            detachable: 'BBBBBB',
            parentTransactionType: 'BBBBBB',
            internalCode: 'BBBBBB',
            version: 'BBBBBB',
            beginLifespanVersion: 'BBBBBB',
            endLifespanVersion: 'BBBBBB',
            tranIndex: 'BBBBBB'
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

      it('should delete a Metadata', () => {
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
