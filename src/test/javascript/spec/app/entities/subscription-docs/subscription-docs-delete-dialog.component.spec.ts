import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EgisexternalTestModule } from '../../../test.module';
import { SubscriptionDocsDeleteDialogComponent } from 'app/entities/subscription-docs/subscription-docs-delete-dialog.component';
import { SubscriptionDocsService } from 'app/entities/subscription-docs/subscription-docs.service';

describe('Component Tests', () => {
  describe('SubscriptionDocs Management Delete Component', () => {
    let comp: SubscriptionDocsDeleteDialogComponent;
    let fixture: ComponentFixture<SubscriptionDocsDeleteDialogComponent>;
    let service: SubscriptionDocsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [SubscriptionDocsDeleteDialogComponent]
      })
        .overrideTemplate(SubscriptionDocsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SubscriptionDocsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubscriptionDocsService);
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
