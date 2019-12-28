import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EgisexternalTestModule } from '../../../test.module';
import { SurveyTransactionDetailComponent } from 'app/entities/survey-transaction/survey-transaction-detail.component';
import { SurveyTransaction } from 'app/shared/model/survey-transaction.model';

describe('Component Tests', () => {
  describe('SurveyTransaction Management Detail Component', () => {
    let comp: SurveyTransactionDetailComponent;
    let fixture: ComponentFixture<SurveyTransactionDetailComponent>;
    const route = ({ data: of({ surveyTransaction: new SurveyTransaction(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [SurveyTransactionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SurveyTransactionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SurveyTransactionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.surveyTransaction).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
