import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EgisexternalTestModule } from '../../../test.module';
import { DocumentRequestDeleteDialogComponent } from 'app/entities/document-request/document-request-delete-dialog.component';
import { DocumentRequestService } from 'app/entities/document-request/document-request.service';

describe('Component Tests', () => {
  describe('DocumentRequest Management Delete Component', () => {
    let comp: DocumentRequestDeleteDialogComponent;
    let fixture: ComponentFixture<DocumentRequestDeleteDialogComponent>;
    let service: DocumentRequestService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [DocumentRequestDeleteDialogComponent]
      })
        .overrideTemplate(DocumentRequestDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DocumentRequestDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DocumentRequestService);
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
