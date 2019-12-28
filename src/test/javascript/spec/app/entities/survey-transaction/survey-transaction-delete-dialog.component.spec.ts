import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EgisexternalTestModule } from '../../../test.module';
import { SurveyTransactionDeleteDialogComponent } from 'app/entities/survey-transaction/survey-transaction-delete-dialog.component';
import { SurveyTransactionService } from 'app/entities/survey-transaction/survey-transaction.service';

describe('Component Tests', () => {
  describe('SurveyTransaction Management Delete Component', () => {
    let comp: SurveyTransactionDeleteDialogComponent;
    let fixture: ComponentFixture<SurveyTransactionDeleteDialogComponent>;
    let service: SurveyTransactionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [SurveyTransactionDeleteDialogComponent]
      })
        .overrideTemplate(SurveyTransactionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SurveyTransactionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SurveyTransactionService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
