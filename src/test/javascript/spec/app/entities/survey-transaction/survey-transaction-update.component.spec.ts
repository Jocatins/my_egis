import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EgisexternalTestModule } from '../../../test.module';
import { SurveyTransactionUpdateComponent } from 'app/entities/survey-transaction/survey-transaction-update.component';
import { SurveyTransactionService } from 'app/entities/survey-transaction/survey-transaction.service';
import { SurveyTransaction } from 'app/shared/model/survey-transaction.model';

describe('Component Tests', () => {
  describe('SurveyTransaction Management Update Component', () => {
    let comp: SurveyTransactionUpdateComponent;
    let fixture: ComponentFixture<SurveyTransactionUpdateComponent>;
    let service: SurveyTransactionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [SurveyTransactionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SurveyTransactionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SurveyTransactionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SurveyTransactionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SurveyTransaction(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new SurveyTransaction();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
