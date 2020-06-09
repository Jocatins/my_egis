import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EgisexternalTestModule } from '../../../test.module';
import { EscalationDeleteDialogComponent } from 'app/entities/escalation/escalation-delete-dialog.component';
import { EscalationService } from 'app/entities/escalation/escalation.service';

describe('Component Tests', () => {
  describe('Escalation Management Delete Component', () => {
    let comp: EscalationDeleteDialogComponent;
    let fixture: ComponentFixture<EscalationDeleteDialogComponent>;
    let service: EscalationService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [EscalationDeleteDialogComponent]
      })
        .overrideTemplate(EscalationDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EscalationDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EscalationService);
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
