import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EgisexternalTestModule } from '../../../test.module';
import { TransactionExtComponent } from 'app/entities/transaction-ext/transaction-ext.component';
import { TransactionExtService } from 'app/entities/transaction-ext/transaction-ext.service';
import { TransactionExt } from 'app/shared/model/transaction-ext.model';

describe('Component Tests', () => {
  describe('TransactionExt Management Component', () => {
    let comp: TransactionExtComponent;
    let fixture: ComponentFixture<TransactionExtComponent>;
    let service: TransactionExtService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [TransactionExtComponent],
        providers: []
      })
        .overrideTemplate(TransactionExtComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TransactionExtComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TransactionExtService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TransactionExt(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.transactionExts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
