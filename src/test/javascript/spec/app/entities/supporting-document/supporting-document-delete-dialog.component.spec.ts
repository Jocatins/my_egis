import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EgisexternalTestModule } from '../../../test.module';
import { SupportingDocumentDeleteDialogComponent } from 'app/entities/supporting-document/supporting-document-delete-dialog.component';
import { SupportingDocumentService } from 'app/entities/supporting-document/supporting-document.service';

describe('Component Tests', () => {
  describe('SupportingDocument Management Delete Component', () => {
    let comp: SupportingDocumentDeleteDialogComponent;
    let fixture: ComponentFixture<SupportingDocumentDeleteDialogComponent>;
    let service: SupportingDocumentService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [SupportingDocumentDeleteDialogComponent]
      })
        .overrideTemplate(SupportingDocumentDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SupportingDocumentDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SupportingDocumentService);
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
