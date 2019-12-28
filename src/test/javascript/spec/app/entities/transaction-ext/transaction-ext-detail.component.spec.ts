import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EgisexternalTestModule } from '../../../test.module';
import { TransactionExtDetailComponent } from 'app/entities/transaction-ext/transaction-ext-detail.component';
import { TransactionExt } from 'app/shared/model/transaction-ext.model';

describe('Component Tests', () => {
  describe('TransactionExt Management Detail Component', () => {
    let comp: TransactionExtDetailComponent;
    let fixture: ComponentFixture<TransactionExtDetailComponent>;
    const route = ({ data: of({ transactionExt: new TransactionExt(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [TransactionExtDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TransactionExtDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TransactionExtDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.transactionExt).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
