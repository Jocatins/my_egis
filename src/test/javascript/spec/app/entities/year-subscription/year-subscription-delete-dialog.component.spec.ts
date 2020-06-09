import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EgisexternalTestModule } from '../../../test.module';
import { YearSubscriptionDeleteDialogComponent } from 'app/entities/year-subscription/year-subscription-delete-dialog.component';
import { YearSubscriptionService } from 'app/entities/year-subscription/year-subscription.service';

describe('Component Tests', () => {
  describe('YearSubscription Management Delete Component', () => {
    let comp: YearSubscriptionDeleteDialogComponent;
    let fixture: ComponentFixture<YearSubscriptionDeleteDialogComponent>;
    let service: YearSubscriptionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EgisexternalTestModule],
        declarations: [YearSubscriptionDeleteDialogComponent]
      })
        .overrideTemplate(YearSubscriptionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(YearSubscriptionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(YearSubscriptionService);
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
