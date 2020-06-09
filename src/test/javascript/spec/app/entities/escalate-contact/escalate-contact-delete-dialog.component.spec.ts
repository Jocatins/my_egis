import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EgisexternalTestModule } from '../../../test.module';
import { EscalateContactDeleteDialogComponent } from 'app/entities/escalate-contact/escalate-contact-delete-dialog.component';
import { EscalateContactService } from 'app/entities/escalate-contact/escalate-contact.service';

describe('Component Tests', () => {
  describe('EscalateContact Management Delete Component', () => {
    let comp: EscalateContactDeleteDialogComponent;
    let fixture: ComponentFixture<EscalateContactDeleteDialogComponent>;
    let service: EscalateContactService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [EscalateContactDeleteDialogComponent]
      })
        .overrideTemplate(EscalateContactDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EscalateContactDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EscalateContactService);
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
